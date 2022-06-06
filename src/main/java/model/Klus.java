package model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;

public class Klus implements Serializable {

    private String klusId;
    private String klant;
    private String adres;
    private LocalDate beginDatum;
    private ArrayList<String> materialen = new ArrayList<>();
    private ArrayList<Werkbon> werknemers = new ArrayList<>();

    public Klus(String klant, String adres, LocalDate beginDatum) {
        this.klant = klant;
        this.adres = adres;
        this.beginDatum = beginDatum;

        this.klusId = "" + Bedrijf.getBedrijf().getAllKlussen().size() + 1;

        if (!Bedrijf.getBedrijf().getAllKlussen().contains(this)) Bedrijf.getBedrijf().addKlus(this);
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

    public String getId() {
        return klusId;
    }
}
