use axum::Json;
use backend::{validate_address, AddressRequest, AddressResponse};

#[tokio::test]
async fn test_valid_p2pkh_address() {
    let request = AddressRequest {
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa".to_string(),
    };
    let response = validate_address(Json(request)).await;
    assert_eq!(
        response.0,
        AddressResponse {
            is_valid: true,
            format: Some("P2pkh".to_string()),
            network: Some("bitcoin".to_string()),
        }
    );
}

#[tokio::test]
async fn test_valid_p2sh_address() {
    let request = AddressRequest {
        address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy".to_string(),
    };
    let response = validate_address(Json(request)).await;
    assert_eq!(
        response.0,
        AddressResponse {
            is_valid: true,
            format: Some("P2sh".to_string()),
            network: Some("bitcoin".to_string()),
        }
    );
}

#[tokio::test]
async fn test_valid_bech32_address() {
    let request = AddressRequest {
        address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4".to_string(),
    };
    let response = validate_address(Json(request)).await;
    assert_eq!(
        response.0,
        AddressResponse {
            is_valid: true,
            format: Some("P2wpkh".to_string()),
            network: Some("bitcoin".to_string()),
        }
    );
}

#[tokio::test]
async fn test_invalid_address() {
    let request = AddressRequest {
        address: "not_a_valid_address".to_string(),
    };
    let response = validate_address(Json(request)).await;
    assert_eq!(
        response.0,
        AddressResponse {
            is_valid: false,
            format: None,
            network: None,
        }
    );
}

#[tokio::test]
async fn test_testnet_address() {
    let request = AddressRequest {
        address: "tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx".to_string(),
    };
    let response = validate_address(Json(request)).await;
    assert_eq!(
        response.0,
        AddressResponse {
            is_valid: false,
            format: None,
            network: None,
        }
    );
} 