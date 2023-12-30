export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      analizeLogs: "Analize logs",
      databasesNav: "Malware databases",
      logs: "Logs",
      logout: "Logout",
      login: {
        welcomeBackTo: "Welcome back to",
        yourEmail: "Your email",
        password: "Password",
        rememberMe: "Remember Me",
        forgotPassword: "Forgot password?",
        signIn: "Sign In",
        signInWithGithub: "Sign In with Github",
        signInWithGoogle: "Sign In with Google",
        dontHaveAnAccountYet: "Don’t have an account yet?",
        signUp: "Sign Up"
      }
    },
    es: {
      analizeLogs: "Analizar logs",
      databasesNav: "Bases de datos de malware",
      logs: "Logs",
      logout: "Cerrar sesión",
      login: {
        welcomeBackTo: "Bienvenido a",
        yourEmail: "Tu email",
        password: "Contraseña",
        rememberMe: "Recuérdame",
        forgotPassword: "Contraseña olvidada?",
        signIn: "Iniciar Sesión",
        signInWithGithub: "Iniciar Sesión con Github",
        signInWithGoogle: "Iniciar Sesión con Google",
        dontHaveAnAccountYet: "Aún no tienes cuenta?",
        signUp: "Regístrate"
      }
    },
    cat: {
      login: {
        welcomeBackTo: "Benvingut a",
        yourEmail: "El teu email",
        password: "Contrasenya",
        rememberMe: "Recorda'm",
        forgotPassword: "Contrasenya oblidada?",
        signIn: "Iniciar Sessió",
        signInWithGithub: "Iniciar Sessió amb Github",
        signInWithGoogle: "Iniciar Sessió amb Google",
        dontHaveAnAccountYet: "Encara no tens compte?",
        signUp: "Regístra't"
      }
    }
  },
}));
