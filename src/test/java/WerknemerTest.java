import model.Werknemer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WerknemerTest {
    Werknemer w1;

    @BeforeEach
    public void init(){
        w1 = new Werknemer("naam",0.0,true);
    }

    @Test
    public void TestWerknemerUurloonOnder0(){
        Werknemer uurloonOnder0 = new Werknemer("Onder0",-1,false);
        assertEquals(0, uurloonOnder0.getUurloon());
    }

    @Test
    public void TestWerknemerUurloonBoven0(){
        Werknemer uurloonBoven0 = new Werknemer("Boven0",5,false);
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