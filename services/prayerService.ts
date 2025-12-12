
import { PrayerTimeData } from "../types";

// Koordinat Gunungsari, Lombok Barat
const LATITUDE = -8.539;
const LONGITUDE = 116.096;
const METHOD = 20; // 20 adalah Kemenag RI (Kementerian Agama Republik Indonesia)

export const getPrayerTimes = async (): Promise<PrayerTimeData | null> => {
  try {
    const date = new Date();
    // Format DD-MM-YYYY
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateString}?latitude=${LATITUDE}&longitude=${LONGITUDE}&method=${METHOD}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data as PrayerTimeData;
  } catch (error) {
    console.error("Gagal mengambil jadwal sholat:", error);
    return null;
  }
};
