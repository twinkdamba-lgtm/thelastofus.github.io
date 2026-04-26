document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const savedMessages = document.getElementById('savedMessages');
    const messageCount = document.getElementById('messageCount');

    let count = 0;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const newsletter = document.getElementById('newsletter').checked;

        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Заполните все обязательные поля');
            return;
        }

        count++;
        messageCount.textContent = count; //обночление вывода числа отправленных сообщ на странице

        if (count === 1) {
            savedMessages.innerHTML = '';
        }

        const messageCard = document.createElement('div'); //создание блока
        messageCard.className = 'message-card';

        messageCard.innerHTML = `
            <h3>${name}</h3>
            <p class="message-email">${email}</p>

            <span class="message-subject">${subject}</span>

            <p class="message-text">${message}</p>

            ${newsletter ? '<span class="newsletter-badge">Подписан на рассылку</span>' : ''} 
        `;//подписка на сообщество игры

        savedMessages.prepend(messageCard); //добавление нового элемента в НАЧАЛО

        form.reset();
    });
});