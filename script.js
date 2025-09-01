// Global variables for state management
        let counter = 0;
        let selectedColor = null;
        let tasks = [];
        let taskIdCounter = 0;
        let completedTasks = 0;

        // Color Palette Interactive Feature
        function initializeColorPalette() {
            const colorBoxes = document.querySelectorAll('.color-box');
            
            colorBoxes.forEach(box => {
                box.addEventListener('click', function() {
                    // Remove previous selection
                    colorBoxes.forEach(b => b.classList.remove('selected'));
                    
                    // Add selection to clicked box
                    this.classList.add('selected');
                    
                    // Update selected color display
                    selectedColor = this.getAttribute('data-color');
                    document.getElementById('selectedColor').textContent = `${this.textContent} (${selectedColor})`;
                    
                    // Change body background to selected color temporarily
                    document.body.style.background = `linear-gradient(135deg, ${selectedColor} 0%, #764ba2 100%)`;
                    
                    setTimeout(() => {
                        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }, 2000);
                });
            });
        }

        // Counter Interactive Feature
        function incrementCounter() {
            counter++;
            updateCounterDisplay();
        }

        function decrementCounter() {
            counter--;
            updateCounterDisplay();
        }

        function resetCounter() {
            counter = 0;
            updateCounterDisplay();
        }

        function doubleCounter() {
            counter *= 2;
            updateCounterDisplay();
        }

        function updateCounterDisplay() {
            const display = document.getElementById('counterDisplay');
            display.textContent = counter;
            
            // Add visual feedback
            display.style.transform = 'scale(1.2)';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
            }, 200);
            
            // Change color based on value
            if (counter > 0) {
                display.style.color = '#28a745';
            } else if (counter < 0) {
                display.style.color = '#dc3545';
            } else {
                display.style.color = '#764ba2';
            }
        }

        // Quiz Interactive Feature
        function checkAnswer(button, isCorrect) {
            const options = button.parentNode.querySelectorAll('.option');
            const resultDiv = document.getElementById('quizResult');
            
            // Disable all options
            options.forEach(opt => {
                opt.disabled = true;
                if (opt === button) {
                    opt.classList.add(isCorrect ? 'correct' : 'incorrect');
                } else if (opt.onclick && opt.onclick.toString().includes('true')) {
                    opt.classList.add('correct');
                }
            });
            
            // Show result
            if (isCorrect) {
                resultDiv.textContent = '🎉 Correct! JavaScript primarily runs in web browsers.';
                resultDiv.style.color = '#28a745';
            } else {
                resultDiv.textContent = '❌ Not quite right. JavaScript primarily runs in web browsers.';
                resultDiv.style.color = '#dc3545';
            }
        }

        // Task Manager Interactive Feature
        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
            
            const task = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };
            
            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }

        function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                completedTasks = tasks.filter(t => t.completed).length;
                document.getElementById('taskCounter').textContent = completedTasks;
                renderTasks();
            }
        }

        function deleteTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            completedTasks = tasks.filter(t => t.completed).length;
            document.getElementById('taskCounter').textContent = completedTasks;
            renderTasks();
        }

        function renderTasks() {
            const container = document.getElementById('taskContainer');
            container.innerHTML = '';
            
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskElement.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})">
                    <span class="task-text">${task.text}</span>
                    <button class="delete-task" onclick="deleteTask(${task.id})">Delete</button>
                `;
                container.appendChild(taskElement);
            });
        }

        // Image Gallery Interactive Feature
        function viewImage(imageSrc) {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            
            modalImage.src = imageSrc;
            modal.style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Form Validation (Custom Implementation)
        function validateField(fieldId, validationFunction, errorId, successId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(errorId);
            const successElement = document.getElementById(successId);
            
            const isValid = validationFunction(field.value);
            
            if (isValid) {
                errorElement.classList.remove('show');
                successElement.classList.add('show');
                field.style.borderColor = '#28a745';
                return true;
            } else {
                errorElement.classList.add('show');
                successElement.classList.remove('show');
                field.style.borderColor = '#dc3545';
                return false;
            }
        }

        function validateName(name) {
            return name.trim().split(' ').length >= 2 && name.trim().length >= 3;
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePhone(phone) {
            const phoneRegex = /^\d{10,}$/;
            return phone === '' || phoneRegex.test(phone.replace(/\D/g, ''));
        }

        function validateAge(age) {
            const ageNum = parseInt(age);
            return ageNum >= 1 && ageNum <= 120;
        }

        function validateCountry(country) {
            return country !== '';
        }

        function validateMessage(message) {
            return message.trim().length >= 10;
        }

        function showStatusMessage(message, type) {
            const statusElement = document.getElementById('statusMessage');
            statusElement.textContent = message;
            statusElement.className = `status-message ${type} show`;
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 5000);
        }

        // Form Event Handlers
        function initializeFormValidation() {
            const form = document.getElementById('contactForm');
            
            // Real-time validation on input
            document.getElementById('name').addEventListener('input', function() {
                validateField('name', validateName, 'nameError', 'nameSuccess');
            });
            
            document.getElementById('email').addEventListener('input', function() {
                validateField('email', validateEmail, 'emailError', 'emailSuccess');
            });
            
            document.getElementById('phone').addEventListener('input', function() {
                validateField('phone', validatePhone, 'phoneError', 'phoneSuccess');
            });
            
            document.getElementById('age').addEventListener('input', function() {
                validateField('age', validateAge, 'ageError', 'ageSuccess');
            });
            
            document.getElementById('country').addEventListener('change', function() {
                validateField('country', validateCountry, 'countryError', 'countrySuccess');
            });
            
            document.getElementById('message').addEventListener('input', function() {
                validateField('message', validateMessage, 'messageError', 'messageSuccess');
            });
            
            // Form submission handler
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const validations = [
                    validateField('name', validateName, 'nameError', 'nameSuccess'),
                    validateField('email', validateEmail, 'emailError', 'emailSuccess'),
                    validateField('phone', validatePhone, 'phoneError', 'phoneSuccess'),
                    validateField('age', validateAge, 'ageError', 'ageSuccess'),
                    validateField('country', validateCountry, 'countryError', 'countrySuccess'),
                    validateField('message', validateMessage, 'messageError', 'messageSuccess')
                ];
                
                const isFormValid = validations.every(validation => validation);
                
                if (isFormValid) {
                    showStatusMessage('🎉 Form submitted successfully! Thank you for your message.', 'success');
                    form.reset();
                    // Clear all success indicators
                    document.querySelectorAll('.success').forEach(el => el.classList.remove('show'));
                } else {
                    showStatusMessage('❌ Please fix the errors above before submitting.', 'error');
                }
            });
        }

        // Image hover effects
        function initializeImageEffects() {
            const images = document.querySelectorAll('.image-container img');
            images.forEach(img => {
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }

        // Task input enter key handler
        function initializeTaskInput() {
            const taskInput = document.getElementById('taskInput');
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
        }

        // Initialize all interactive features when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeColorPalette();
            initializeFormValidation();
            initializeImageEffects();
            initializeTaskInput();
            
            // Add some sample tasks
            document.getElementById('taskInput').value = 'Learn JavaScript';
            addTask();
            document.getElementById('taskInput').value = 'Build a website';
            addTask();
            document.getElementById('taskInput').value = 'Practice coding';
            addTask();
        });

        // Click outside modal to close
        document.getElementById('imageModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
