<!-- omit in toc -->
# Epic Stream API

## 📦Data

**Data consists of three basic semantic units**

- `SHOW`: A specific podcast that contains a single or several `SEASON`
- `SEASON`: A collection of `EPISODE` released across a specific timespan
- `EPISODE`: Corresponds to a specific MP3 file that user can listen

However, the following information is also exposed via the API

- `PREVIEW`: A summarised version of a `SHOW` that only contains basic information. Usually exposed when an array of different `SHOW` information is requested.
- `GENRE`: Information related to a (one of many) genres that can be assigned to a `SHOW`

### Relationships

The following chart indicates the relations between units of data. It uses Entity Relationship mapping. In order to understand the meaning of symbols in the chart please read [the overview on the Mermaid.js documentation](https://mermaid.js.org/syntax/entityRelationshipDiagram.html). 

Note that the text between the units indicates what properties map to one another. It is separated by means of three underscores (`___`). The value before the underscores is the mapping from the parent object, whereas the values after the underscore is the mapping from the child object.

_Note that is some cases there is no way to infer the parent from the child itself , in those cases just the parent map is noted, with no value after the underscores_.

```mermaid
erDiagram

PREVIEW {
    number id
    string title
    string description
		number seasons
		string image
		array genreIds
		updated string
}

SHOW {
    number id
    string title
    string description
		array seasons
}

SEASON {
  number id
	string title
	string image
	array episodes
}

EPISODE {
	number id
	string file
	string title
}

GENRE {
	number id
	string title
	string description
	array showIds
}

PREVIEW ||--|| SHOW: id___id
PREVIEW }|--|{ GENRE: genreIds___showIds
SHOW }|--|{ GENRE: genreIds___showIds
SHOW ||--|{ SEASON: seasons___
SEASON ||--|{ EPISODE: episodes___

```

### Endpoints

Data can be called via a `fetch` request to the following three endpoints. Note that there is not always a one-to-one mapping between endpoints and actual data structures. Also note that  ***`<ID>`** indicates where the dynamic ID for the requested item should be placed. For example: `[https://epic-stream-api.netlify.app/genre/3](https://epic-stream-api.netlify.app/genre/3)`* 

| URL                                              |                                                                                        |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `https://epic-stream-api.netlify.app`            | Returns an array of PREVIEW                                                            |
| `https://epic-stream-api.netlify.app/genre/<ID>` | Returns a GENRE object                                                                 |
| `https://epic-stream-api.netlify.app/id/<ID>`    | Returns a SHOW object with several SEASON and EPISODE objects directly embedded within |

### Genre Titles

Since genre information is only exposed by means of the specific `GENRE` id, it is recommended that you include the mapping between genre id values and title in your code itself:

| ID  | Title       |
| --- | ----------- |
| 1   | Crime       |
| 2   | Drama       |
| 3   | Thriller    |
| 4   | Documentary |
| 5   | Nature      |
| 6   | War         |
| 7   | History     |
| 8   | Animation   |
| 9   | Action      |
| 10  | Adventure   |
| 11  | Science     |
| 12  | Family      |
| 13  | Biography   |
| 14  | Sport       |
| 15  | Fantasy     |
| 16  | Horror      |
| 17  | Mystery     |
| 18  | Comedy      |
| 19  | Sci-Fi      |
| 20  | Music       |
| 21  | News        |
| 22  | Talk Show   |
| 23  | Romance     |
| 24  | Game Show   |
