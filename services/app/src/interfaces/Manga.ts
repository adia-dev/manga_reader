export default interface Manga {
    data: Datum[];
  }
  
  export interface Datum {
    id:            string;
    type:          string;
    attributes:    DatumAttributes;
    relationships: Relationship[];
  }
  
  export interface DatumAttributes {
    title:                          TitleClass;
    altTitles:                      AltTitle[];
    description:                    TitleClass;
    isLocked:                       boolean;
    links:                          Links;
    originalLanguage:               string;
    lastVolume:                     string;
    lastChapter:                    string;
    publicationDemographic:         null | string;
    status:                         string;
    year:                           number | null;
    contentRating:                  string;
    tags:                           Tag[];
    state:                          string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt:                      Date;
    updatedAt:                      Date;
    version:                        number;
    availableTranslatedLanguages:   string[];
    latestUploadedChapter:          null | string;
  }
  
  export interface AltTitle {
    ja?:      string;
    en?:      string;
    "ja-ro"?: string;
  }
  
  export interface TitleClass {
    en?: string;
  }
  
  export interface Links {
    al?:  string;
    mu?:  string;
    amz?: string;
    raw?: string;
  }
  
  export interface Tag {
    id:            string;
    type:          Type;
    attributes:    TagAttributes;
    relationships: any[];
  }
  
  export interface TagAttributes {
    name:        TitleClass;
    description: PurpleDescription;
    group:       Group;
    version:     number;
  }
  
  export interface PurpleDescription {
  }
  
  export enum Group {
    Format = "format",
    Genre = "genre",
    Theme = "theme",
  }
  
  export enum Type {
    Tag = "tag",
  }
  
  export interface Relationship {
    id:          string;
    type:        string;
    attributes?: RelationshipAttributes;
  }
  
  export interface RelationshipAttributes {
    description: string;
    volume:      string;
    fileName:    string;
    locale:      string;
    createdAt:   Date;
    updatedAt:   Date;
    version:     number;
  }
  