package model;

import java.io.Serializable;

public class Werkbon implements Serializable {

    private Werknemer werknemer;
    private double aantalUren;

    public Werkbon(Werknemer werknemer){
        this.werknemer = werknemer;
    }

    public Werknemer getWerknemer() {
        return werknemer;
    }

    public double getUren(){
        return  aantalUren;
    }

    public void addUren(double uren){
        // er kunnen geen negatieve uren toegevoegd worden
        if (uren > 0) {
            aantalUren += uren;
        }
    }
}
