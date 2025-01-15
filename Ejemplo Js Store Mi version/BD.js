function BD() {
    // Configuración de JsStore:
    var jsStoreCon = new JsStore.Connection(new Worker("jsstore/jsstore.worker.min.js"));

    // Definición de la tabla `personas`:
    var tblPersonas = {
        name: 'personas',
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            dni: { notNull: true, dataType: "string" },
            nombre: { notNull: true, dataType: "string" },
            apellidos: { dataType: "string" },
            fnacimiento: { notNull: true, dataType: "date_time" },
            estatura: { dataType: "number" }
        }
    };

    // Definición de la base de datos:
    var dbName = 'CRUD_Personas';
    var database = {
        name: dbName,
        tables: [tblPersonas]
    };

    // Función para crear la base de datos:
    const createDB = async (db) => {
        try {
            const isDbCreated = await jsStoreCon.initDb(db);
            if (isDbCreated) {
                console.log("Base de datos creada exitosamente");
                insertarPersonasIniciales(); // Insertar datos iniciales si la base de datos se creó
            } else {
                console.log("Base de datos abierta");
            }
        } catch (ex) {
            console.error(ex.message);
        }
    };

    // Inserción inicial de dos personas:
    const insertarPersonasIniciales = async () => {
        const personas = [
            {
                dni: '75919041C',
                nombre: 'Javier',
                apellidos: 'Muñoz Mayorga',
                fnacimiento: new Date('2002-03-20'),
                estatura: 1.85
            },
            {
                dni: '12378945B',
                nombre: 'Clara',
                apellidos: 'Breuer',
                fnacimiento: new Date('2004-11-08'),
                estatura: 1.65
            }
        ];
        const insertCount = await jsStoreCon.insert({
            into: 'personas',
            values: personas
        });
        console.log(`${insertCount} registros iniciales insertados en la tabla personas`);
    };

    // CRUD
    // Crear una persona
    this.insertarPersona = async (persona) => {
        const result = await jsStoreCon.insert({
            into: 'personas',
            values: [persona]
        });
        console.log(`Persona insertada: ${result}`);
    };

    // Leer todas las personas
    this.obtenerPersonas = async () => {
        const personas = await jsStoreCon.select({
            from: 'personas'
        });
        console.log("Lista de personas:", personas);
        return personas;
    };

    // Actualizar persona
    this.actualizarPersona = async (id, datos) => {
        const result = await jsStoreCon.update({
            in: 'personas',
            set: datos,
            where: { id: id }
        });
        console.log(`Persona actualizada, filas afectadas: ${result}`);
    };

    // Eliminar persona
    this.eliminarPersona = async (id) => {
        const result = await jsStoreCon.remove({
            from: 'personas',
            where: { id: id }
        });
        console.log(`Persona eliminada, filas afectadas: ${result}`);
    };

    // Inicialización de la base de datos
    createDB(database);
}
