import * as YUP from "yup";

export function initialValues(producto = null) {
    return {
        nombre: producto?.nombre || "",
        precio: producto?.precio || "",
        cantidad: producto?.cantidad || "",
        unidad: producto?.unidad || "",
        imagen: null,
        description: producto?.description || "",
        imagenPreview: null,
        imagenFile: null,
    };
}
 
// se usa isEdit: true si es edición, false si es creación
export function validationSchema(isEdit = false) {
    return YUP.object({
        nombre: YUP.string().required("El nombre es obligatorio"),
        precio: YUP.number().required("El precio es obligatorio"),
        cantidad: YUP.number().required("La cantidad es obligatoria"),
        unidad: YUP.string().required("La unidad es obligatoria"),
        description: YUP.string().required("La descripción es obligatoria"),
        imagen: YUP.mixed().test(
            "fileRequired",
            "La imagen es obligatoria",
            function (value) {
                if (isEdit) return true;
                return value !== null && value !== undefined;
            }
        )
    });
}