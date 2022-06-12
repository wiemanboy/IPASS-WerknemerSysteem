import model.Klus;
import model.Werknemer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class WerknemerTest {
    Klus k1;
    Werknemer w1;

    @BeforeEach
    public void init(){
        k1 = new Klus("klantNaam", "straat", LocalDate.now());
        w1 = new Werknemer("naam",0.0,"werknemer");
    }

    @Test
    public void TestWerknemerUurloonOnder0(){
        Werknemer uurloonOnder0 = new Werknemer("Onder0",-1,"werknemer");
        assertEquals(0, uurloonOnder0.getUurloon());
    }

    @Test
    public void TestWerknemerUurloonBoven0(){
        Werknemer uurloonBoven0 = new Werknemer("Boven0",5,"werknmer");
        assertEquals(5.0, uurloonBoven0.getUurloon());
    }


    @Test
    public void TestCorrectPassword(){
        assertTrue(w1.checkPassword("1234"));
    }

    @Test
    public void TestIncorrectPassword(){
        assertFalse(w1.checkPassword("4321"));
    }

}