export const encryptPassword = async (password: string): Promise<Uint8Array>  => {
    const encodedPassword = new TextEncoder().encode(password); // convert string to Uint8Array
    const encryptedPassword = await crypto.subtle.digest({
        name: "SHA-256"
      },
      encodedPassword
    )

    return new Uint8Array(encryptedPassword);
}