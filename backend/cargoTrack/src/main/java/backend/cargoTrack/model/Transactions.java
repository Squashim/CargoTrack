package backend.cargoTrack.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
 @Entity
public class Transactions {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;
    @Column(name="amount")
    private double amount;
    @ManyToOne
    private TransactionTypes transactionType;
    @ManyToOne
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "timestamp")
    private String timestamp;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public TransactionTypes getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionTypes transactionType) {
        this.transactionType = transactionType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
