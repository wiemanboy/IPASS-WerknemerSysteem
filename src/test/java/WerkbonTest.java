import model.Klus;
import model.Werknemer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WerkbonTest {

    Werknemer w1;
    Klus k1;

    @BeforeEach
    public void init(){
        k1 = new Klus("klantNaam", "straat", LocalDate.now());
        w1 = new Werknemer("naam",0.0,"werknemer");
        k1.addWerknemer(w1);
    }

    @Test
    public void TestAddUren(){
        k1.getWerknemer(w1).addUren(5);
        k1.getWerknemer(w1).addUren(10);
        assertEquals(15.0, k1.getWerknemer(w1).getUren());
    }

    @Test
    public void TestAddNegatieveUren(){
        k1.getWerknemer(w1).addUren(-5);
        k1.getWerknemer(w1).addUren(10);
        assertEquals(10.0, k1.getWerknemer(w1).getUren());
    }


}