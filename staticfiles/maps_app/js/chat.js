// Define API URL
const API_URL = 'http://localhost:9000';

// Define sendChatMessage globally
window.sendChatMessage = async function(message, showChat = true) {
    const chatContainer = document.getElementById('chat-container');

    if (message) {
        if (showChat) {
            chatContainer.classList.remove('hidden');
        }

        // Display user message immediately
        addMessage(message, true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ text: message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            addMessage(data.response, false);
            return data.response;
        } catch (error) {
            console.error('Chat error:', error);
            addMessage('Sorry, the chat server is currently unavailable. Please try again later.', false);
            return null;
        }
    }
};

// Helper function for adding messages
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Rest of chat initialization
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');

    if (!chatIcon || !chatContainer || !closeChat || !chatInput || !sendMessage) {
        console.error('Chat elements not found');
        return;
    }

    // Chat icon click handler
    chatIcon.addEventListener('click', async () => {
        chatContainer.classList.remove('hidden');
        chatInput.focus();

        try {
            const response = await fetch(`${API_URL}/init`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            addMessage(data.response, false);
        } catch (error) {
            console.error('Error:', error);
            addMessage("Sorry. The server is currently down. Please try again later.", false);
        }
    });

    // Close chat handler
    closeChat.addEventListener('click', () => {
        chatContainer.classList.add('hidden');
    });

    // Chat input handlers
    function handleInputMessage() {
        const message = chatInput.value.trim();
        if (message) {
            chatInput.value = '';
            sendChatMessage(message);
        }
    }

    sendMessage.addEventListener('click', handleInputMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInputMessage();
        }
    });
}); 