import React, { useEffect, useState } from "react";
import './home.css';

function HomeFunc() {

    const [weather, setWeather] = useState(null);
    const [coordinate, setCoordinate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [networkStatus, setNetworkStatus] = useState(null);
    const [ipInfo, setIpInfo] = useState(null);
    const [population, setPopulation] = useState(null);

    const updateNetworkStatus = () => {
        if (navigator.connection) {
            setNetworkStatus(navigator.connection.downlink);
        } else {
            setNetworkStatus("Not supported");
        }
    };

    useEffect(() => {
        updateNetworkStatus();

        if (navigator.connection) {
            navigator.connection.addEventListener("change", updateNetworkStatus);
            return () => {
                navigator.connection.removeEventListener("change", updateNetworkStatus);
            };
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinate({ latitude, longitude });
                    console.log("Geolocation data:", latitude, longitude);
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.log("Geolocation error", error);
                    setErrorMessage("Unable to retrieve your location. Please enable location services.");
                    setLoading(false);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            setErrorMessage("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchPopulation = async () => {
            setLoading(true);
            setErrorMessage(null);

            try {
                const response = await fetch("https://bazaar-analyze-c1d62cd1ada0.herokuapp.com/api/population/world");

                if (!response.ok) {
                    throw new Error("Serverdan xato javob olindi.");
                }

                const data = await response.json();

                if (data.success) {
                    setPopulation({
                        total: data.data.total,
                        male: data.data.male,
                        female: data.data.female,
                        children: data.data.children,
                    });
                } else {
                    setErrorMessage("Aholi ma'lumotlarini olishda xatolik yuz berdi.");
                }
            } catch (error) {
                console.log("Aholi ma'lumotlarini olishda xatolik:", error);
                setErrorMessage("Internet yoki serverga ulanishda xatolik yuz berdi.");
            } finally {
                setLoading(false);
            }
        };

        fetchPopulation();
    }, []);


    useEffect(() => {
        const fetchIPDetails = async () => {
            try {
                const response = await fetch("http://localhost:1972/api/locations/address");
                const data = await response.json();

                console.log("Backend Response:", data);

                if (data.success) {
                    setIpInfo({
                        ip: data.data.ip,
                        country: data.data.country || "Unknown",
                        city: data.data.city || "Unknown",
                        latitude: data.data.latitude || "N/A",
                        longitude: data.data.longitude || "N/A",
                    });
                } else {
                    setErrorMessage("IP ma'lumotlarini olishda xatolik yuz berdi.");
                }
            } catch (error) {
                console.log("IP ma'lumotlarini olishda xatolik:", error);
                setErrorMessage("Internet yoki serverga ulanishda xatolik yuz berdi.");
            }
        };

        fetchIPDetails();
    }, []);

    const fetchWeather = async (latitude, longitude) => {
        try {
            const location = "some-location";
            const url = `http://localhost:1972/api/weather/${location}?lat=${latitude}&lon=${longitude}`;
            console.log("Fetching weather data from URL:", url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.log("Error details:", error);
            setErrorMessage(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homeContainer">

            {/* Climate information part */}
            <div className="home-global-climate-part">
                <h1 className="home-weather-info-text">Weather Information</h1>

                {loading ? (
                    <p className="home-weather-loading">Loading weather data...</p>
                ) : errorMessage ? (
                    <p className="home-weather-error">{errorMessage}</p>
                ) : weather ? (
                    <div className="home-in-weather-notes">
                        <div className="home-weather-notes-locate-block">
                            <div className="home-weather-locate-left-notes">
                                <p className="home-weather-place"><b className="home-climate-note-int">City:</b> {weather.name}</p>
                                <p className="home-weather-place"><b className="home-climate-note-int">Temperature:</b> {weather.main.temp}°C</p>
                            </div>
                            <div className="home-weather-locate-right-notes">
                                <p className="home-weather-place"><b className="home-climate-note-int">Humidity:</b> {weather.main.humidity}%</p>
                                <p className="home-weather-place"><b className="home-climate-note-int">Weather:</b> {weather.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="home-weather-error">Could not fetch weather data.</p>
                )}
            </div>

            {/* Internet tezligi bo'limi */}
            <div className="home-network-status">
                <div className="home-network-status-text">
                    <h1 className="home-network-statuses-title">
                        Network speed
                    </h1>
                </div>

                <div className="home-network-status-block">
                    <p className="home-network-notes-part">
                        {/*<b>Current speed: </b>*/}
                        {networkStatus ? `${networkStatus} Mbps` : `Checking...`}
                    </p>
                </div>
            </div>

            {/* My locations */}
            <div className="home-your-location">
                <h1 className="home-loation-top-text">Your Location Details</h1>
                {ipInfo ? (
                    <div className="home-location-details">
                        <div className="home-locate-left-notes">
                            <p><b>IP:</b> {ipInfo.ip}</p>
                            <p><b>Country:</b> {ipInfo.country}</p>
                            <p><b>City:</b> {ipInfo.city}</p>
                        </div>
                        <div className="home-locate-right-notes">
                            <p><b>Latitude:</b> {ipInfo.latitude}</p>
                            <p><b>Longitude:</b> {ipInfo.longitude}</p>
                        </div>
                    </div>
                ) : (
                    <p>Fetching location data...</p>
                )}
            </div>

            {/* Populations */}
            <div className="home-number-of-humans">
                <h1 className="home-population-title">Dunyo aholisi soni</h1>

                {loading ? (
                    <p>Yuklanmoqda...</p>
                ) : errorMessage ? (
                    <p className="home-population-error">{errorMessage}</p>
                ) : population && population.total && population.male && population.female && population.children ? (
                    <div className="home-population-details">
                        <div className="home-population-left-parts">
                            <p><b>Umumiy aholi soni:</b> {population.total.toLocaleString()} kishi</p>
                            <p><b>Erkaklar soni:</b> {population.male.toLocaleString()} kishi</p>
                        </div>
                        <div className="home-population-right-parts">
                            <p><b>Ayollar soni:</b> {population.female.toLocaleString()} kishi</p>
                            <p><b>Bolalar soni:</b> {population.children.toLocaleString()} kishi</p>
                        </div>
                    </div>
                ) : (
                    <p>Aholi ma'lumotlari yuklanmadi!</p>
                )}
            </div>
        </div>
    );
}

export default HomeFunc;
