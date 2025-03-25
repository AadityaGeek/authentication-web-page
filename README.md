# Firebase Authentication Website

A secure web application implementing Firebase Authentication with email verification, password reset functionality, and protected API access using Google Cloud Console restrictions.

## Features

- 🔐 User Authentication
  - Email and Password Sign In
  - New User Registration with Email Verification
  - Password Reset Functionality
  - Password Visibility Toggle

- 🛡️ Security Features
  - Email Verification Required for Login
  - API Access Restriction via Google Cloud Console
  - Loading States and User Feedback
  - Client-side Input Validation

## Setup

1. Clone this repository
```bash
git clone [https://github.com/AadityaGeek/authentication-web-page]
```

2. Configure Firebase:
   - Create a new project in [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication in the Authentication section
   - Replace the Firebase configuration in `script.js` with your own:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

3. Set up API Restrictions:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to your project's API & Services → Credentials
   - Edit your API key
   - Add appropriate restrictions (HTTP referrers, IP addresses, etc.)

## Usage

The application provides three main interfaces:

1. **Sign In** (`signin.html`)
   - Login with email and password
   - Requires email verification
   - Option to reset password

2. **Sign Up** (`signup.html`)
   - Register new account
   - Automatic email verification sending
   - Name, email, and password required

3. **Password Reset** (`reset-password.html`)
   - Request password reset email
   - User-friendly feedback

## Security Measures

- Email verification required before login
- API access restricted through Google Cloud Console
- Password requirements enforced
- Loading states to prevent multiple submissions
- Automatic sign-out for unverified users
- Timed message displays for user feedback

## Dependencies

- Firebase Authentication
- Font Awesome (for password visibility toggle)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Firebase Authentication Documentation
- Google Cloud Console Documentation 
