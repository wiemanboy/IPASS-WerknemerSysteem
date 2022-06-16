package security;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;

public class PasswordHashing {
    private static final ArrayList<String> pepperList = new ArrayList<>(Arrays.asList("pepper1", "pizza", "oven", "gekkehacker", "sheeeesh", "such", "secure", "wow", "winks", "nsacomeatme"));

    public static byte[] generateSalt(){
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public static StringBuilder hashPassword(String password, byte[] salt){
        MessageDigest md;
        StringBuilder sb = new StringBuilder();

        try {
            // Select the message digest for the hash computation -> SHA-512
            md = MessageDigest.getInstance("SHA-512");

            // Passing the salt to the digest for the computation
            md.update(salt);

            // add random pepper from list
            String pepper = pepperList.get(new SecureRandom().nextInt(pepperList.size()));
            md.update(pepper.getBytes(StandardCharsets.UTF_8));

            // Generate the salted hash
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));

            for (byte b : hashedPassword)
                sb.append(String.format("%02x", b));

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return sb;
    }

    public static boolean checkPassword(StringBuilder hash, byte[] salt, String password){
        MessageDigest md;
        for (String s : pepperList) {
            try {
                // Select the message digest for the hash computation -> SHA-512
                md = MessageDigest.getInstance("SHA-512");

                // Passing the salt to the digest for the computation
                md.update(salt);

                // add index pepper from list
                md.update(s.getBytes(StandardCharsets.UTF_8));

                // Generate the salted hash
                byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));

                StringBuilder sb = new StringBuilder();
                for (byte b : hashedPassword)
                    sb.append(String.format("%02x", b));

                String inputHashedPassword = sb.toString();
                String databaseHashedPassword = hash.toString();

                if (inputHashedPassword.equals(databaseHashedPassword)){ return true;}

            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
}