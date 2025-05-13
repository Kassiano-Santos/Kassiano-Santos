import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;

import org.json.JSONObject;

public class ClimateInformationProject {

	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter the city name: ");
		String city = scanner.nextLine();
		
		try {
			String climatesDate = getClimatesDate(city);
			if(climatesDate.contains("\"code\":1006")) {
				System.out.println("Location not found. Please try again.");
			}else {
				printClimatesDate(climatesDate);
			}
		} catch (Exception ex){
			System.out.println(ex.getMessage());
		}
	}
	
	public static String getClimatesDate(String city) throws Exception{
		String apiKey = Files.readString(Paths.get("api-key.txt")).trim();
		
		String cityNameFormat = URLEncoder.encode(city, StandardCharsets.UTF_8);
		//Starts building a new http request by setting the request URI
		String apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + cityNameFormat;
		HttpRequest request = HttpRequest.newBuilder().uri(URI.create(apiUrl)).build();
		
		HttpClient client = HttpClient.newHttpClient();
		//Send the request and receive the response
		HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
		
		return response.body();
	}
	
	public static void printClimatesDate(String data) {
		
		JSONObject jsonDate = new JSONObject(data);
		JSONObject weatherInfo = jsonDate.getJSONObject("current");
		String city = jsonDate.getJSONObject("location").getString("name");
		String country = jsonDate.getJSONObject("location").getString("country");
		
		String weatherCond = weatherInfo.getJSONObject("condition").getString("text");
		int humidity = weatherInfo.getInt("humidity");
		float windVel = weatherInfo.getFloat("wind_kph");
		float atmosPressure = weatherInfo.getFloat("pressure_mb");
		float thermSensation = weatherInfo.getFloat("feelslike_c");
		float currentTemp = weatherInfo.getFloat("temp_c");
		
		String dateHourString = weatherInfo.getString("last_updated");
		
		System.out.println("Data is obtained through the website https://www.weatherapi.com");
		System.out.println();
		System.out.println("Weather info for the " + city + ", " + country);
		System.out.println("Date and Hour: " + dateHourString);
		System.out.println("Current Temperature: " + currentTemp + "°C");
		System.out.println("Thermal Sensation: " + thermSensation + "°C");
		System.out.println("Weather Condition: " + weatherCond);
		System.out.println("Humidity: " + humidity + "%");
		System.out.println("Wind Speed: " + windVel + " km/h");
		System.out.println("Atmospheric Pressure: " + atmosPressure + " mb");
		
		
	}
	
}
