package backend.cargoTrack.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_delivery")
    private Long idDelivery;

    @Column(name = "description", nullable = false, length = 200)
    private String description;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "start_city_id", nullable = false)
    private City startCity;

    @ManyToOne
    @JoinColumn(name = "end_city_id", nullable = false)
    private City endCity;

    @ManyToOne
    @JoinColumn(name = "user_id_user", nullable = true)
    private User user;

    @Column(name = "remuneration", nullable = false)
    private Double remuneration;


}
