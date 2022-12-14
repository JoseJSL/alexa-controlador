import { Teacher } from "../model/teacher";
import { sanitizeString, strIncludes } from "./string";

const TempTeacher: Teacher[] = [
    {
        ID: 1,
        ID_tipo_tarjeta: 2,
        propietario: "Rocío",
    },
    {
        ID: 2,
        ID_tipo_tarjeta: 2,
        propietario: "Edgar",
    },
];

export async function getTeacher(
    teacher: string
): Promise<Teacher | undefined> {
    teacher = sanitizeString(teacher).trim();
    return TempTeacher.find((t) =>
        strIncludes(
            teacher,
            ...sanitizeString(t.propietario.trim()).split(/\s+/g)
        )
    );
}
