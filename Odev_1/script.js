$(document).ready(function () {
    const getData = async () => {
        try {
            console.log("API'den Veri çekiliyor...");
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();

            
            const storageData = {
                timestamp: new Date().getTime(),
                users: data
            };
            localStorage.setItem("userData", JSON.stringify(storageData));

            
            displayData(data);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
            $('#ins-api-users').html(`<p>Veriler alınamadı.</p>`);
        }
    };

    const displayData = (data) => {
        $('#ins-api-users').empty(); 
        data.forEach(function (post) {
            const html = `
                <div class="result-item success">
                    <h1>${post.name}</h1>
                    <p>${post.username}</p>
                    <small>Email: ${post.email}</small>
                </div>`;
            $('#ins-api-users').append(html);
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
            
            }, 2000);
        });
    };

    process();
});