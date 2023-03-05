use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Manga {
    id: String,
    #[serde(rename = "type")]
    kind: String,
    attributes: MangaAttributes,
    relationships: Vec<MangaRelationship>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MangaTagAttributes {
    name: MultiLanguageSupport,
    description: MultiLanguageSupport,
    group: String,
    version: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MangaTag {
    id: String,
    #[serde(rename = "type")]
    kind: String,
    attributes: MangaTagAttributes,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MangaRelationshipAttributes {
    description: String,
    volume: String,
    #[serde(rename = "fileName")]
    file_name: String,
    locale: String,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "updatedAt")]
    updated_at: String,
    version: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MangaRelationship {
    id: String,
    #[serde(rename = "type")]
    kind: String,
    attributes: Option<MangaRelationshipAttributes>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MultiLanguageSupport {
    en: Option<String>,
    ja: Option<String>,
    #[serde(rename = "ja-ro")]
    ja_ro: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MangaAttributes {
    title: MultiLanguageSupport,
    #[serde(rename = "altTitles")]
    alt_itles: Vec<MultiLanguageSupport>,
    description: MultiLanguageSupport,
    #[serde(rename = "isLocked")]
    is_locked: bool,
    #[serde(rename = "originalLanguage")]
    original_language: String,
    status: String,
    year: i32,
    #[serde(rename = "contentRating")]
    content_rating: String,
    tags: Vec<MangaTag>,
    state: String,
    version: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MangaResponse {
    result: String,
    response: String,
    data: Vec<Manga>,
    total: i32,
    offset: i32,
    limit: i32,
}
