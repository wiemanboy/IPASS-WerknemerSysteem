package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Werknemer implements Serializable {

    private String naam;
    private double uurloon;
    private String role;
    private StringBuilder hash;
    private byte[] salt;
    private static ArrayList<Werknemer> allWerknemers = new ArrayList<>();

    public Werknemer(String naam, double uurloon, String role){
        this.naam = naam;
        this.role = role;

        if (uurloon < 0) {
            this.uurloon = 0;
        }
        else {
            this.uurloon = uurloon;
        }

        // Auto generate password: 1234
        salt = PasswordHashing.generateSalt();
        hash = PasswordHashing.hashPassword("1234", salt);

        // add de aangemaakte werknemer aan allewerknemers
        if (!allWerknemers.contains(this)) {
            allWerknemers.add(this);
            Klus.getKlusById(1).addWerknemer(this);
        }
    }

    public boolean checkPassword(String password){
        return PasswordHashing.checkPassword(hash, salt, password);
    }

    public void generateNewPassword(String password){
        salt = PasswordHashing.generateSalt();
        hash = PasswordHashing.hashPassword(password, salt);
    }

    public void changeUurloon(double uurloon){
        this.uurloon = uurloon;
    }

    public void changeAdminRecht(String role){
        this.role = role;
    }

    public double getUurloon(){
        return  uurloon;
    }

    public String getNaam(){
        return naam;
    }

    public String getAdminRecht(){
        return role;
    }

    public static Werknemer getWerknemerByNaam(String naam) {
        for (Werknemer w : getAllWerknemers()) {
            if (w.getNaam().equals(naam)) {
                return w;
            }
        }
        return null;
    }

    public static ArrayList<Werknemer> getAllWerknemers(){
        return allWerknemers;
    }

    public static void removeWerknemer(Werknemer werknemer){
        allWerknemers.remove(werknemer);
    }

}
