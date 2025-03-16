
const appendLocation= '#ins-api-users'



$(document).ready(function () {

    const getData = async () => {
        try {
            console.log("API'den Veri çekiliyor...");
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();

            
            const  storageData = {
                timestamp: new Date().getTime(),
                users: data
            };
            
            localStorage.setItem("userData", JSON.stringify(storageData));

            
            displayData(data);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
            $(appendLocation).html(`<p>Veriler alınamadı.</p>`);
        }
    };


    $(document).on('click', '.delete-user',function(){
       
         const userid = $(this).data('id');
         const storedData = localStorage.getItem("userData");
         const userarray = JSON.parse(storedData);

         const users = userarray.users;

         const updatedUsers = users.filter(users => users.id !== userid );


         const storageData = {
            timestamp: userarray.timestamp,
            users: updatedUsers
        };
        

         localStorage.setItem('userData',JSON.stringify(storageData));
         displayData(updatedUsers);
         debugger
        

    });

    $(document).on('click','.restart',function(){

        localStorage.removeItem("userData");
        sessionStorage.setItem("restartUsed", "true"); 
        
        process();

    })
    

    const displayData = (data) => {
        $(appendLocation).empty(); 
        data.forEach(function (post) {
            const html = `
                <div style="background-color:#c5ebcf; text-align:center" class="result-item success">
                    <h1>${post.name}</h1>
                    <p>${post.username}</p>
                    <small>Email: ${post.email}</small>
                    <button class="delete-user" data-id="${post.id}">sil</button>
                </div>`;
              
            $(appendLocation).append(html);
        });
    };

    const process = () => {
        return new Promise(() => {
            setTimeout(() => {
                const storedData = localStorage.getItem("userData");
                if (storedData) {
                   
                    const now = new Date().getTime();
                    const oneDay = 24 * 60 * 60 * 1000; 

                    if (now - JSON.parse(storedData).timestamp < oneDay) {
                        console.log("LocalStorage'dan veriler alınıyor...");
                        displayData(JSON.parse(storedData).users);
                        
                        return;
                    }
                }

             
                getData()
            
            }, 1000);
        });
    };

      process();



      const targetNode = document.querySelector(appendLocation)
      
      const config = {childList: true};
      
      
      const callback = () => {
            if(!targetNode.children.length && !sessionStorage.getItem("restartUsed")){
              
              const html = `<div style="display: flex; justify-content: center; margin-top: 15px;">
                                <button class="restart">Geri Getir</button>
                            </div>`
              $(appendLocation).append(html);
      
            }
          
        };
      
        
        const observer = new MutationObserver(callback);
      
        observer.observe(targetNode, config);
      

callback()

});

