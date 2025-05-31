use axum::{Json};
use bitcoin::Address;
use serde::{Deserialize, Serialize};
use std::str::FromStr;

#[derive(Deserialize)]
pub struct AddressRequest {
    pub address: String,
}

#[derive(Serialize, Debug, PartialEq)]
pub struct AddressResponse {
    pub is_valid: bool,
    pub format: Option<String>,
    pub network: Option<String>,
}

pub async fn validate_address(Json(payload): Json<AddressRequest>) -> Json<AddressResponse> {
    let address_str = payload.address;
    let parse_result = Address::from_str(&address_str);

    match parse_result {
        Ok(address) => {
            let checked_address = address.require_network(bitcoin::Network::Bitcoin).ok();
            match checked_address {
                Some(addr) => {
                    let format = addr.address_type().map(|t| format!("{:?}", t)).unwrap_or_else(|| "Unknown".to_string());
                    Json(AddressResponse {
                        is_valid: true,
                        format: Some(format),
                        network: Some(addr.network().to_string()),
                    })
                },
                None => Json(AddressResponse {
                    is_valid: false,
                    format: None,
                    network: None,
                }),
            }
        },
        Err(_) => Json(AddressResponse {
            is_valid: false,
            format: None,
            network: None,
        }),
    }
} 