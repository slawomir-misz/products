type errorState = {
  message: string
}

export default function reducer(errorState: errorState, errorCode: string) {
    switch (errorCode) {
      case "":
        return { message: "" };
      case "auth/too-many-requests":
        return { message: "Your account is temporary blocked" };
      case "auth/wrong-password":
        return { message: "Wrong password" };
      case "auth/user-not-found":
        return { message: "User not found" };
      case "auth/weak-password":
        return { message: "Password is to week"}
      default:
        return { message: "Some other error occured" };
    }
}