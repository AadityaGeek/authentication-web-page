// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt_Oid7jry3ONXgOzd7-Hv35GlrDL59RA",
  authDomain: "authentication-web-page.firebaseapp.com",
  projectId: "authentication-web-page",
  storageBucket: "authentication-web-page.firebasestorage.app",
  messagingSenderId: "692428273021",
  appId: "1:692428273021:web:68a735a42a8c3e509dc814"
};

// Initialize Firebase using the compatibility version
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = firebase.auth();

// Make auth available globally
window.auth = auth;

console.log("Firebase config loaded");
console.log("Firebase initialized successfully");
console.log("Auth.js loaded");

// DOM Elements
const signInForm = document.querySelector('#sign-in-form');
const signUpForm = document.querySelector('#sign-up-form');
const resetPasswordForm = document.querySelector('#reset-password-form');

// Update the message container creation and positioning
function createMessageContainer(form) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    
    // Find the button in the form
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Insert the message container before the button
    submitButton.parentNode.insertBefore(messageContainer, submitButton);
    
    return messageContainer;
}

// Create message containers for each form
const signInMessage = signInForm ? createMessageContainer(signInForm) : null;
const signUpMessage = signUpForm ? createMessageContainer(signUpForm) : null;
const resetMessage = resetPasswordForm ? createMessageContainer(resetPasswordForm) : null;

// Display message function
function showMessage(message, isError = false, form) {
    const messageContainer = form.querySelector('.message-container');
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = isError 
            ? 'message-container error' 
            : 'message-container success';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = 'message-container';
        }, 5000);
    }
}

// Add loading state handling functions
function setLoading(form, isLoading) {
    const button = form.querySelector('button[type="submit"]');
    const overlay = form.closest('.auth-box').querySelector('.processing-overlay');
    
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.innerHTML = `
            <div class="loading-spinner"></div>
            <span>${button.textContent}</span>
        `;
        if (overlay) {
            overlay.classList.add('active');
        }
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        button.innerHTML = `<span>${button.textContent}</span>`;
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Handle Sign In
if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setLoading(signInForm, true);
        
        const email = signInForm.querySelector('input[type="email"]').value;
        const password = signInForm.querySelector('input[type="password"]').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                if (!user.emailVerified) {
                    // If email is not verified, sign out and show message
                    auth.signOut();
                    throw new Error('Please verify your email address before signing in. Check your inbox.');
                }
                
                showMessage('Successfully signed in!', false, signInForm);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            })
            .catch((error) => {
                showMessage(error.message, true, signInForm);
                setLoading(signInForm, false);
            });
    });
}

// Handle Sign Up
if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setLoading(signUpForm, true);
        
        const nameInput = signUpForm.querySelector('input[type="text"]');
        const emailInput = signUpForm.querySelector('input[type="email"]');
        const passwordInput = signUpForm.querySelector('input[type="password"]');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email || !password || !name) {
            showMessage("Please fill out all fields", true, signUpForm);
            setLoading(signUpForm, false);
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters", true, signUpForm);
            setLoading(signUpForm, false);
            return;
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Send email verification
                return user.sendEmailVerification()
                    .then(() => {
                        // Update profile with name
                        return user.updateProfile({
                            displayName: name
                        });
                    })
                    .then(() => {
                        // Sign out the user until they verify their email
                        return auth.signOut();
                    })
                    .then(() => {
                        showMessage('Account created! Please check your email to verify your account before signing in.', false, signUpForm);
                        setTimeout(() => {
                            window.location.href = 'signin.html';
                        }, 3000);
                    });
            })
            .catch((error) => {
                console.error("Sign up error:", error.code, error.message);
                showMessage(error.message, true, signUpForm);
                setLoading(signUpForm, false);
            });
    });
}

// Handle Password Reset
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setLoading(resetPasswordForm, true);
        
        const email = resetPasswordForm.querySelector('input[type="email"]').value;
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                showMessage('Password reset email sent. Check your inbox!', false, resetPasswordForm);
                setTimeout(() => {
                    setLoading(resetPasswordForm, false);
                }, 1500);
            })
            .catch((error) => {
                showMessage(error.message, true, resetPasswordForm);
                setLoading(resetPasswordForm, false);
            });
    });
}

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user.email);
    } else {
        console.log("User is signed out");
    }
});

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        // Start with the slashed eye since password is hidden by default
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
        
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            // Toggle password visibility
            if (input.type === 'password') {
                // Show password
                input.type = 'text';
                this.classList.add('show-password');
                this.classList.add('fa-eye');
                this.classList.remove('fa-eye-slash');
            } else {
                // Hide password
                input.type = 'password';
                this.classList.remove('show-password');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });
}); 