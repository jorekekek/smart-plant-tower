import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import Svg, { Path } from "react-native-svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import auth from "./src/firebaseConfig";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password cannot be empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError("");

      // ❌ REMOVE setPersistence — React Native handles persistence automatically

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);

      router.push("/mainapp"); // successful login, redirect
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        setError("No user found with that email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Background with Wave */}
        <ImageBackground
          source={require("../assets/images/backgoundpre.jpg")}
          style={styles.background}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#1b5e20" />
          </TouchableOpacity>

          {/* Wave SVG */}
          <Svg height="100" width="100%" viewBox="0 0 1440 320" style={styles.wave}>
            <Path
              fill="#fff"
              d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,181.3C840,181,960,139,1080,117.3C1200,96,1320,96,1380,96L1440,96L1440,320L0,320Z"
            />
          </Svg>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.loginPromptText}>Log in to your account</Text>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#b0b0b0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#b0b0b0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color="#b0b0b0"
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.rememberMeCircle,
                rememberMe ? styles.rememberMeCircleActive : null,
              ]}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && (
                <Icon name="check" size={12} color="#fff" style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Forgot password tapped!")}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    height: 210,
    justifyContent: "flex-end",
  },
  wave: {
    position: "relative",
    top: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    opacity: 0.8,
    borderRadius: 50,
    padding: 8,
  },
  content: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 5,
  },
  loginPromptText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  rememberMeCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#b0b0b0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  rememberMeCircleActive: {
    borderColor: "#1b5e20",
    backgroundColor: "#1b5e20",
  },
  checkIcon: {
    alignSelf: "center",
  },
  rememberMeText: {
    fontSize: 12,
    color: "#555",
    marginLeft: -110,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "underline",
  },
  loginButton: {
    backgroundColor: "#1b5e20",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginBottom: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
