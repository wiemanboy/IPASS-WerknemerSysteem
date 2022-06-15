import model.Klus;
import model.Werknemer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertEquals;

class KlusTest {
    Werknemer w1;
    Werknemer w2;
    Klus k1;
    Klus k2;

    @BeforeEach
    public void init(){
        k1 = new Klus("klantNaam", "straat", LocalDate.now());
        k2 = new Klus("klantNaam1", "straat2", LocalDate.now());
        w1 = new Werknemer("naam",0.0,"werknemer");
        w2 = new Werknemer("naam",0.0,"admin");
    }

    @Test
    public void testGetWerknemer(){
        k1.addWerknemer(w1);
        k1.addWerknemer(w2);
        assertEquals(w1, k1.getWerknemer(w1).getWerknemer());
    }

    @Test
    public void TestAddWerknemer(){
        k1.addWerknemer(w1);
        k1.addWerknemer(w2);
        assertEquals(w1, k1.getWerknemers().get(0).getWerknemer());
        System.out.println("eerste werknemer klopt");
        assertEquals(w2, k1.getWerknemers().get(1).getWerknemer());
        System.out.println("tweede werknemer klopt");
    }

    @Test
    public void TestAddMateriaal(){
        k1.addMateriaal("Materiaal1");
        k1.addMateriaal("Materiaal2");
        assertEquals("Materiaal1", k1.getMaterialen().get(0));
        System.out.println("eerste materiaal klopt");
        assertEquals("Materiaal2", k1.getMaterialen().get(1));
        System.out.println("tweede materiaal klopt");
    }

    @Test
    public void TestGetKlusById(){
        assertEquals(k2, Klus.getKlusById(2));
        assertEquals(null, Klus.getKlusById(3));
    }

}