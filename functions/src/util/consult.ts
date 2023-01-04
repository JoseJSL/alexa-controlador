import fetch from "node-fetch";
import { ClassData } from "../model/class-data";
import { Secret } from "../secret.env";
import { sanitizeString } from "./string";

// Se le da ID de salón. Regresa la ID de la siguiente clase. (8:28 => 8:40)
export async function getNextClassData(
    classroomId: number
): Promise<ClassData | null> {
    const classId = await getNextClassId(classroomId);

    if (classId) {
        return {
            claseId: classId,
            nombreSalon: await getClassroomName(classId),
            nombreClase: await getClassName(classId),
            horaEntrada: await getStartTime(classId),
            horaSalida: await getEndTime(classId),
            nombreProfesor: await getTeacherName(classId),
        };
    }

    return null;
}

// Busca una clase de acuerdo a su nombre. Regresa la ID de la clase con ese nombre (%LIKE%).
export async function getNextClassDataByClassName(
    className: string,
    classroomId: number
): Promise<ClassData | null> {
    const classId = await getClassIdByName(
        sanitizeString(className),
        classroomId
    );

    if (classId) {
        return {
            claseId: classId,
            nombreSalon: await getClassroomName(classId),
            nombreClase: await getClassName(classId),
            horaEntrada: await getStartTime(classId),
            horaSalida: await getEndTime(classId),
            nombreProfesor: await getTeacherName(classId),
        };
    }

    return null;
}

// Busca una clase de acuerdo a su profesor (nombre). Regresa la ID de la clase con ese profesor (%LIKE%).
export async function getNextClassDataByTeacherName(
    teacherName: string,
    classroomId: number
): Promise<ClassData | null> {
    const classId = await getClassIdByTeacher(
        sanitizeString(teacherName),
        classroomId
    );

    if (classId) {
        return {
            claseId: classId,
            nombreSalon: await getClassroomName(classId),
            nombreClase: await getClassName(classId),
            horaEntrada: await getStartTime(classId),
            horaSalida: await getEndTime(classId),
            nombreProfesor: await getTeacherName(classId),
        };
    }

    return null;
}

export async function getNextClassId(classroomId: number): Promise<number> {
    const result = await getPartialClassData(`${Secret.consultServer}/idsc`, {
        salonId: classroomId,
    });

    if (result && result.claseId) {
        return result.claseId;
    }

    throw new Error("No classId");
}

export async function getClassIdByName(className: string, classroomId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/bids`, {
        nombreClase: className,
        salonId: classroomId,
    });

    if (result && result.claseId) {
        return result.claseId;
    }

    throw new Error("No classId");
}

export async function getClassIdByTeacher(
    teacher: string,
    classroomId: number
) {
    const result = await getPartialClassData(`${Secret.consultServer}/bidp`, {
        nombreProfe: teacher,
        salonId: classroomId,
    });

    if (result && result.claseId) {
        return result.claseId;
    }

    throw new Error("No classId");
}

export async function getClassIdByStartTime(startTime: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/idsc`, {
        startTime: startTime,
    });

    if (result && result.claseId) {
        return result.claseId;
    }

    throw new Error("No classId");
}

export async function getClassroomName(classId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/ns`, {
        claseId: classId,
    });

    if (result && result.nombreSalon) {
        return result.nombreSalon;
    }

    throw new Error(
        "No response on getClassroomName " + JSON.stringify(result)
    );
}

export async function getClassName(classId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/nc`, {
        claseId: classId,
    });

    if (result && result.nombreClase) {
        return result.nombreClase;
    }

    throw new Error("No response on getClassName " + JSON.stringify(result));
}

export async function getStartTime(classId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/he`, {
        claseId: classId,
    });

    if (result && result.horaEntrada) {
        return Number(result.horaEntrada);
    }

    throw new Error("No response on getStartTime " + JSON.stringify(result));
}

export async function getEndTime(classId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/hs`, {
        claseId: classId,
    });

    if (result && result.horaSalida) {
        return Number(result.horaSalida);
    }

    throw new Error("No response on getEndTime " + JSON.stringify(result));
}

export async function getTeacherName(classId: number) {
    const result = await getPartialClassData(`${Secret.consultServer}/np`, {
        claseId: classId,
    });

    if (result && result.nombreProfesor) {
        return result.nombreProfesor;
    }

    throw new Error("No response on getTeacherName " + JSON.stringify(result));
}

function getRequestData(url: string, body: { [key: string]: any }) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

async function getPartialClassData(
    url: string,
    body: { [key: string]: any }
): Promise<Partial<ClassData>> {
    const response = await getRequestData(url, body);
    return response && response.ok && response.json();
}
