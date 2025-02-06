package backend.cargoTrack.db.migration;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;


import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.core.io.ClassPathResource;

public class V3__Data extends BaseJavaMigration {


    @Override
    public void migrate(Context context) {
        try {
            Connection connection = context.getConnection();
            Map<String, String> fileToTable = new LinkedHashMap<>();
            fileToTable.put("data/goodtypes.csv", "good_types(name)");
            fileToTable.put("data/status.csv", "status(name)");
            fileToTable.put("data/companytype.csv", "company_types(type)");
            fileToTable.put("data/goodsubtypes.csv", "good_subtypes(name,good_type_id)");
            fileToTable.put("data/location.csv", "locations(province,street,number,postal_code,city,latitude,longitude)");
            fileToTable.put("data/buildingtype.csv", "building_type(vehicle_capacity,trailer_capacity,driver_capacity,name,radius)");
            fileToTable.put("data/transactiontype.csv", "transaction_types(name)");
            fileToTable.put("data/vehicletype.csv", "vehicle_types(name,trailer_required)");
            fileToTable.put("data/trailertype.csv", "trailer_types(name,price,image_path,capacity)");
            fileToTable.put("data/vehicle.csv", "vehicles(brand,model,horsepower,max_speed,production_year,image_path,price,vehicle_types_id,fuel_consumption)");
            fileToTable.put("data/company.csv", "company(province,name,street,number,postal_code,city,latitude,longitude,company_types_id)");
            fileToTable.put("data/goods.csv", "goods(name,weight,base_price,good_subtype_id)");

            List<String> fileOrder = List.of(
                "data/goodtypes.csv",
                "data/status.csv",
                "data/companytype.csv",
                "data/goodsubtypes.csv",
                "data/location.csv",
                "data/buildingtype.csv",
                "data/transactiontype.csv",
                "data/vehicletype.csv",
                "data/trailertype.csv",
                "data/vehicle.csv",
                "data/company.csv",
                "data/goods.csv"
            );

         
            for (String fileName : fileOrder) {
                importCsv(connection, fileName, fileToTable.get(fileName));
            }
        } catch (Exception e) {
            throw new RuntimeException("Błąd podczas importu CSV: " + e.getMessage(), e);
        }
    }

    private void importCsv(Connection connection, String fileName, String tableWithColumns) throws Exception {
        String sql = "INSERT INTO " + tableWithColumns + " VALUES (" + "?,".repeat(tableWithColumns.split(",").length-1) + "?)";
        
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(new ClassPathResource(fileName).getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(br, CSVFormat.DEFAULT.withSkipHeaderRecord());
             PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
              
            for (CSVRecord record : csvParser) {
                if (record.getRecordNumber() == 1) {
                    continue;
                }
                String[] columns = tableWithColumns.substring(tableWithColumns.indexOf('(') + 1, tableWithColumns.indexOf(')')).split(",");
                for (int i = 0; i < record.size(); i++) {
                    String value = record.get(i).trim();
                    String columnName = columns[i];
                    if (value.equalsIgnoreCase("NULL")) {
                        ps.setNull(i + 1, java.sql.Types.NULL);
                    } else if (Arrays.asList("vehicle_capacity", "trailer_capacity", "driver_capacity", 
                                      "horsepower", "max_speed", "production_year", "skills","capacity","vehicle_types_id","good_type_id","good_subtype_id","company_types_id","fuel_consumption")
                            .stream().anyMatch(columnName::contains)) {
                        ps.setInt(i + 1, Integer.parseInt(value));
                    } else if (Arrays.asList("longitude", "latitude", "radius", "base_price", "price", 
                                             "salary", "weight", "distance", "payment", 
                                             "fuel_consumption", "fuel_used")
                            .stream().anyMatch(columnName::contains)) {
                        ps.setDouble(i + 1, Double.parseDouble(value));
                    } else if (columnName.contains("trailer_required")) {
                        ps.setBoolean(i + 1, Boolean.parseBoolean(value));
                    } else {
                        ps.setString(i + 1, value);
                    }
                }
                ps.executeUpdate();
                
              
            }
        }
    }
}
