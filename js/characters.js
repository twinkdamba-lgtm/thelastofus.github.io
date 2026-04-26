fetch('../xml/characters.xml')
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        const characters = xml.getElementsByTagName("character");
        const container = document.getElementById("characters-container");

        for (let i = 0; i < characters.length; i++) {
            const char = characters[i];

            const name = char.getElementsByTagName("name")[0].textContent;
            const age = char.getElementsByTagName("age")[0].textContent;
            const role = char.getElementsByTagName("role")[0].textContent;
            const description = char.getElementsByTagName("description")[0].textContent;
            const image = char.getElementsByTagName("image")[0].textContent;

            const card = `
                <div class="character-card">
                    <div class="character-content">
                        <div class="character-accent"></div>
                        <img class="character-avatar" src="${image}" alt="${name}">
                        <div class="character-info">
                            <div class="character-header">
                                <h2>${name}</h2>
                                <span class="character-age">${age}</span>
                            </div>
                            <p class="character-role">${role}</p>
                            <p class="character-description">${description}</p>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += card;
        }
    })
    .catch(error => console.error("Ошибка загрузки XML:", error));