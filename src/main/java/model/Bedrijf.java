package model;

import java.io.Serializable;
import java.util.ArrayList;

public class Bedrijf implements Serializable {

    private static ArrayList<Klus> allKlussen = new ArrayList<>();
    private static ArrayList<Werknemer> allWerknemers = new ArrayList<>();
    private static Bedrijf my_bedrijf = new Bedrijf();

    public static Bedrijf getBedrijf() {
        return my_bedrijf;
    }

    public static void setBedrijf(Bedrijf bedrijf) {
        my_bedrijf = bedrijf;
    }

    private Bedrijf(){
    }

    public Klus getKlusById(String id){
        for (Klus k : getAllKlussen()){
            if (k.getId().equals(id)){
                return k;
            }
        }
        return null;
    }

    public ArrayList<Klus> getAllKlussen() {
        return allKlussen;
    }

    public void addKlus(Klus klus){
        allKlussen.add(klus);
    }

    public Werknemer getWerknemerByNaam(String naam) {
        for (Werknemer w : getAllWerknemers()) {
            if (w.getNaam().equals(naam)) {
                return w;
            }
        }
        return null;
    }

    public ArrayList<Werknemer> getAllWerknemers(){
        return allWerknemers;
    }

    public void addWerknemer(Werknemer werknemer){
        allWerknemers.add(werknemer);
    }
}

