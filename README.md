# **Models** 

	periodos: [
		id: integer,
		numperiodo: integer,
		aulasdia: integer,
		inicio: date,
		termino: date,
		presObrig: integer,
		medaprov: double,
		createdAt: date,
		updatedAt: date,          
		horarios: <horarios>,
		materias: <materias>
	]

	horarios: [
		id: integer,
		periodoId: integer
		inicio: time,
		termino: time",
		ordemaula: integer,
		createdAt: date,
		updatedAt: date
	]

	materias: [
		id: integer,
		periodoId: integer,
		cor: string,
		nome: string,
		sigla: string,
		freq: integer,
		medaprov: number,
		createdAt: date,
		updatedAt: date,
		aulas: <aulas>
		faltas: <faltas>
		notas: <notas>
	]

	notas: [
		id: integer,
		data: date,
		nota: integer,
		createdAt: date,
		updatedAt: date,
		materiaId: integer
	]

	aulas: [
		id: integer,
		weekday: integer,
		ordem: integer,
		createdAt: date,
		updatedAt: date,
		materiaId: integer
	]

	faltas: [
		id: integer,
		data: date,
		ordemAula: integer,
		createdAt: date,
		updatedAt: date,
		materiaId: integer
	]

# **Routes**

# /auth
**_POST_ /login & /signin**

**body:** 

	{
		email: string
		password: string
	}

**result:**

	{
		email: string
		data : [periodos]
		token: jwt
	}

# /periodos
**_POST_ /periodos**

**body:** 

	{
		numperiodo: integer,
		aulasdia: integer,
		inicio: date,
		termino: date,
		presObrig: integer,
		medaprov: double,
		horarios: [horarios]
	}

**result:**

	{
		id: integer
		timestamp: date
	}
---
**_GET_ /periodos**

**result**
	
	periodos: <periodos>
___

**_GET_ /periodos/:id**

**result**

	periodos: <periodos>

# **Horarios**
**_POST_ /horarios**

**body**

	{
		idperiodo: integer,
		ordemaula: integer,
		inicio: time,
		termino: time
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_GET_ /horarios/:idperiodo**

**result**

	{
		horarios: [horarios]
	}
___
**_DELETE_ /horarios/:idperiodo**

**result**

	{
		removed: integer
	}
___
# **Materias**
**_GET_ /materias/:idperiodo**

**result**

	{
		materias: [materias]
	}
___
**_DELETE_ /materias/:id**

**result**

	{
		removed: integer
	}
___
**_POST_ /materias**

**body**

	{
		periodoId: integer
		cor: string
		nome: string
		sigla: string
		freq: boolean
		medaprov: number
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_POST_ /materias/many**

**body**

	[
		{
			periodoId: integer
			cor: string
			nome: string
			sigla: string
			freq: boolean
			medaprov: number
		}
	]

**result**

	{
		materias: [materias]
	}

# **Faltas**
**_POST_ /faltas**

**body**

	{
		materiaId: integer
		data: date
		ordemAula: integer
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_GET_ /faltas/:idmateria**

**result**

	{
		faltas: [faltas]
	}
___
**_DELETE_ /faltas/:id**

**result**

	{
		removed: integer
	}

# **Aulas**
**_POST_ /aulas**

**body**

	{
		materiaId: integer
		weekday: integer
		ordem: integer
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_PUT_ /aulas**

**body**

	{
		id: integer
		weekday: integer
		ordem: integer
		idmateria: integer
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_GET_ /aulas/:idmateria**

**result**

	{
		notas: [notas]
	}
___
**_DELETE_ /aulas/:id**

**result**

	{
		removed: integer
	}

# **Notas**
**_POST_ /notas**

**body**

	{
		materiaId: integer,
		data: date,
		nota: number
	}

**result**

	{
		id: integer
		timestamp: date
	}
___
**_GET_ /notas/:idmateria**

**result**

	{
		notas: [notas]
	}
___
**_DELETE_ /notas/:id**

**result**

	{
		removed: integer
	}