export type Animal = {
    name: string,
    translation: Translation[],
    image: File|null,
    species: string
}

export type Translation = {
    tag: string,
    name: string
}

export default Animal;
