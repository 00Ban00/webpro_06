"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const timestamp = new Date().toLocaleString(); 

    const params = {
        method: "POST",
        body: 'name=' + name + '&message=' + message + '&timestamp=' + timestamp,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            document.querySelector('#message').value = "";
        });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            console.log(value);

            if (number !== value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            console.log(mes);  
                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;
                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                            let timestamp_area = document.createElement('span');
                            timestamp_area.className = 'timestamp';
                            timestamp_area.innerText = ` 投稿日時: ${mes.timestamp}`;

                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            cover.appendChild(timestamp_area);

                            
                            let replyButton = document.createElement('button');
                            replyButton.className = 'reply-button';
                            replyButton.innerText = '返信';
                            replyButton.dataset.id = mes.id;  

                            
                            let replyForm = document.createElement('div');
                            replyForm.className = 'reply-form';
                            let replyMessageInput = document.createElement('input');
                            replyMessageInput.type = 'text';
                            replyMessageInput.placeholder = '返信を入力...';
                            let replySubmitButton = document.createElement('button');
                            replySubmitButton.innerText = '返信する';
                            replySubmitButton.dataset.id = mes.id; 

                            replySubmitButton.addEventListener('click', () => {
                                const replyMessage = replyMessageInput.value;
                                const params = {
                                    method: 'POST',
                                    body: 'id=' + mes.id + '&message=' + replyMessage,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                };
                                const url = '/reply';
                                fetch(url, params)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error');
                                        }
                                        return response.json();
                                    })
                                    .then((updatedPost) => {
                                        
                                        let replyArea = document.createElement('div');
                                        replyArea.className = 'reply';
                                        let replyName = document.createElement('span');
                                        replyName.className = 'name';
                                        replyName.innerText = updatedPost.reply.name;
                                        let replyMessage = document.createElement('span');
                                        replyMessage.className = 'mes';
                                        replyMessage.innerText = updatedPost.reply.message;

                                        replyArea.appendChild(replyName);
                                        replyArea.appendChild(replyMessage);
                                        cover.appendChild(replyArea); 
                                        replyMessageInput.value = ''; 
                                    });
                            });

                            
                            replyButton.style.display = 'none';
                            replyForm.appendChild(replyMessageInput);
                            replyForm.appendChild(replySubmitButton);

                            
                            let deleteButton = document.createElement('button');
                            deleteButton.className = 'delete-button';
                            deleteButton.innerText = '削除';
                            deleteButton.dataset.id = mes.id;  

                           
                            deleteButton.addEventListener('click', () => {
                                const params = {
                                    method: 'POST',
                                    body: 'id=' + mes.id,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                };
                                const url = '/delete';
                                fetch(url, params)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error');
                                        }
                                        return response.json();
                                    })
                                    .then(() => {
                                        
                                        cover.remove();
                                    });
                            });

                            
                            let likeButton = document.createElement('button');
                            likeButton.className = 'like-button';
                            likeButton.innerText = 'いいね';
                            likeButton.dataset.id = mes.id;  

                            
                            let likeCount = document.createElement('span');
                            likeCount.className = 'like-count';
                            likeCount.innerText = `いいね: ${mes.likes}`;

                            
                            likeButton.addEventListener('click', () => {
                                const params = {
                                    method: 'POST',
                                    body: 'id=' + mes.id,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                };
                                const url = '/like';
                                fetch(url, params)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error');
                                        }
                                        return response.json();
                                    })
                                    .then((updatedMes) => {
                                       
                                        likeCount.innerText = `いいね: ${updatedMes.likes}`;
                                        likeButton.classList.toggle('liked');
                                    });
                            });

                            cover.appendChild(likeButton);
                            cover.appendChild(likeCount);
                            cover.appendChild(deleteButton);  
                            cover.appendChild(replyForm); 

                            bbs.appendChild(cover);
                        }
                    })
            }
        });
});

