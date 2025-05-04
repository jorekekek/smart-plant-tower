import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import auth from "./src/firebaseConfig"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Registration() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setError("");

      // 🔥 Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 🔥 Update the user's profile with the full name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      console.log("User registered:", userCredential.user);

      // ✅ After successful registration, navigate to login page
      router.replace("/"); // Replace so they can't go back to registration by back button
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("That email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      {/* Top Background with Correct Curve */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("../assets/images/backgoundpre.jpg")}
          style={styles.background}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="1b5e20" />
          </TouchableOpacity>
        </ImageBackground>

        {/* Correct Curve */}
          {/* Wave SVG */}
                  <Svg height="100" width="100%" viewBox="0 0 1440 320" style={styles.wave}>
                    <Path
                      fill="#fff"
                      d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,181.3C840,181,960,139,1080,117.3C1200,96,1320,96,1380,96L1440,96L1440,320L0,320Z"
                    />
                  </Svg>
      </View>

      <View style={styles.content}>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.loginPromptText}>Create your new account</Text>

        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    height: 290,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wave: {
    position: "relative",
    top: -80,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
    marginTop: -80,
  },
  loginPromptText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#1b5e20",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
