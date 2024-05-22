use astronav::{
    coords::{
        deg_to_dms, deg_to_hms, dms_to_deg, hms_to_deg, hours_to_hms, noaa_sun::NOAASun, star::AltAzBuilder
    },
    time,
};
use web_sys::{self};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_local_sun_info(
    year: u16,
    month: u8,
    day: u8,
    hour: u8,
    min: u8,
    sec: u8,
    lat: f32,
    long: f32,
    timezone: f32,
) -> Vec<String> {

    // web_sys::console::log_1(&year.into());
    // web_sys::console::log_1(&month.into());
    // web_sys::console::log_1(&day.into());
    // web_sys::console::log_1(&hour.into());
    // web_sys::console::log_1(&min.into());
    // web_sys::console::log_1(&sec.into());
    // web_sys::console::log_1(&lat.into());
    // web_sys::console::log_1(&long.into());
    // web_sys::console::log_1(&timezone.into());

    // web_sys::console::log_1(&"============".into());


    let local_sun = NOAASun::new()
        .date(year, month, day)
        .hour(hour)
        .min(min)
        .sec(sec)
        .lat(lat)
        .long(long)
        .timezone(timezone);

    // let a = vec![
    //     (local_sun.altitude_in_deg()),
    //     (local_sun.azimuth_in_deg()),
    //     (local_sun.ha_pos_time_in_deg()),
    //     (local_sun.declination()),
    //     (local_sun.sunrise_time_hours()),
    //     (local_sun.sunset_time_hours()),
    //     (local_sun.noon_hours()),
    // ];
    // web_sys::console::log_1(&local_sun.altitude_in_deg().into());
    // web_sys::console::log_1(&local_sun.azimuth_in_deg().into());
    // web_sys::console::log_1(&local_sun.ha_pos_time_in_deg().into());
    // web_sys::console::log_1(&local_sun.declination().into());
    // web_sys::console::log_1(&local_sun.sunrise_time_hours().into());
    // web_sys::console::log_1(&local_sun.sunset_time_hours().into());
    // web_sys::console::log_1(&local_sun.noon_hours().into());
    // web_sys::console::log_1(&"============".into());


        // web_sys::console::log_1(&a[0].clone().into());
        // web_sys::console::log_1(&a[1].clone().into());
        // web_sys::console::log_1(&a[2].clone().into());
        // web_sys::console::log_1(&a[3].clone().into());
        // web_sys::console::log_1(&a[4].clone().into());
        // web_sys::console::log_1(&a[5].clone().into());
        // web_sys::console::log_1(&a[6].clone().into());
        // web_sys::console::log_1(&a[7].clone().into());


    vec![
        deg_to_dms(local_sun.altitude_in_deg() as f32),
        deg_to_dms(local_sun.azimuth_in_deg() as f32),
        deg_to_dms(local_sun.zenith_in_deg() as f32),
        deg_to_hms(local_sun.ha_in_deg() as f32),
        deg_to_dms(local_sun.alt_true_declination() as f32),
        deg_to_hms(local_sun.ra_in_deg() as f32),
        hours_to_hms(local_sun.sunrise_time_hours() as f32),
        hours_to_hms(local_sun.sunset_time_hours() as f32),
        hours_to_hms(local_sun.noon_hours() as f32),
        hours_to_hms(local_sun.day_length() as f32),
        (local_sun.eot_in_mins() as f32).to_string(),
        (local_sun.frac_day_of_year() as f32).to_string(),


    ]
}

#[wasm_bindgen]
pub fn get_local_star_infos(
    year: u16,
    month: u8,
    day: u8,
    hour: u8,
    min: u8,
    sec: u8,
    lat: &str,
    long: &str,
    dec: &str,
    ra: &str,
    tz: f32
) -> Vec<String> {
    if dms_to_deg(lat).is_err() || dms_to_deg(long).is_err() {
        web_sys::console::log_1(&"There was a failure".into());

        return vec!["null".to_owned()];
    }

    web_sys::console::log_1(&"Inside star function".into());


    let lat = dms_to_deg(lat).unwrap();
    let long = dms_to_deg(long).unwrap();

    let julian_day = time::julian_day_number(day, month, year);
    let julian_time = time::julian_time(julian_day, hour, min, sec, tz);
    let gmst = time::gmst_in_degrees(julian_time);

    let lmst = time::lmst_in_degrees(gmst, long);
    let local_star = AltAzBuilder::new()
        .dec(dms_to_deg(dec).unwrap())
        .lat(lat)
        .lmst(lmst)
        .ra(hms_to_deg(ra).unwrap())
        .seal()
        .build();

    vec![
        deg_to_dms(local_star.get_altitude() as f32),
        deg_to_dms(local_star.get_azimuth() as f32),
    ]
}

#[wasm_bindgen]
pub fn get_time_related(
    year: u16,
    month: u8,
    day: u8,
    hour: u8,
    min: u8,
    sec: u8,
    long: &str,
    tz: f32
) -> Vec<String> {
    if dms_to_deg(long).is_err() {
        return vec!["null".to_owned()];
    }

    let long = dms_to_deg(long).unwrap();

    let julian_day = time::julian_day_number(day, month, year);
    let julian_time = time::julian_time(julian_day, hour, min, sec, tz);
    let gmst = time::gmst_in_degrees(julian_time);

    let lmst = time::lmst_in_degrees(gmst, long);

    vec![
        julian_day.to_string(),
        julian_time.to_string(),
        deg_to_dms(gmst as f32),
        deg_to_dms(lmst as f32),
    ]
}
