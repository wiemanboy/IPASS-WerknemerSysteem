package model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;

public class Klus implements Serializable {

    private int klusId;
    private String klant;
    private String adres;
    private LocalDate beginDatum;
    private ArrayList<String> materialen = new ArrayList<>();
    private ArrayList<Werkbon> werknemers = new ArrayList<>();
    private static ArrayList<Klus> allKlussen = new ArrayList<>();

    public Klus(String klant, String adres, LocalDate beginDatum) {
        this.klant = klant;
        this.adres = adres;
        this.beginDatum = beginDatum;

        this.klusId = getAllKlussen().size() + 1;

        // add de aangemaakte klus aan alleklussen
        if (!allKlussen.contains(this)) allKlussen.add(this);
    }

    public void addWerknemer(Werknemer werknemer) {
        Werkbon werkbon = new Werkbon(werknemer);
        werknemers.add(werkbon);
    }

    public void addMateriaal(String materiaal) {
        materialen.add(materiaal);
    }

    public ArrayList<Werkbon> getWerknemers() {
        return werknemers;
    }

    public Werkbon getWerknemer(Werknemer werknemer) {
        // get de werkbon van een specifieke werknemer
        for (Werkbon werkbon : getWerknemers()) {
            if (werkbon.getWerknemer().equals(werknemer)) {
                return werkbon;
            }
        }
        return null;
    }

    public ArrayList<String> getMaterialen() {
        return materialen;
    }

    public int getId() {
        return klusId;
    }

    public static Klus getKlusById(int id){
        for (Klus k : getAllKlussen()){
            if (k.getId() == id){
                return k;
            }
        }
        return null;
    }

    public static ArrayList<Klus> getAllKlussen() {
        return allKlussen;
    }

    public static void setAllKlussen(ArrayList<Klus> allKlussen) {
        Klus.allKlussen = allKlussen;
    }
}
