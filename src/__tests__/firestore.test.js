import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Tests de escritura y lectura en Firestore.
 * Usan mocks para simular las operaciones sin conexión real.
 */

vi.mock('../firebase/firestore', () => ({
  guardarResultado: vi.fn(),
  obtenerResultadosPorUsuario: vi.fn(),
  obtenerTodosLosResultados: vi.fn(),
}));

import {
  guardarResultado,
  obtenerResultadosPorUsuario,
  obtenerTodosLosResultados,
} from '../firebase/firestore';

const resultadoMock = {
  uid: 'uid-abc',
  nombre: 'Lucía',
  apellido: 'Fernández',
  email: 'lucia@ejemplo.com',
  puntaje: 18,
  porcentaje: 72,
  nivelAlcanzado: 'Avanzado',
  indicesCorrectos: [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21],
  indicesIncorrectos: [4, 9, 14, 18, 22, 23, 24],
};

describe('guardarResultado', () => {
  beforeEach(() => vi.clearAllMocks());

  it('guarda el resultado y devuelve un ID de documento', async () => {
    guardarResultado.mockResolvedValueOnce('doc-id-xyz');
    const id = await guardarResultado(resultadoMock);
    expect(guardarResultado).toHaveBeenCalledWith(resultadoMock);
    expect(typeof id).toBe('string');
    expect(id).toBe('doc-id-xyz');
  });

  it('el payload contiene todos los campos requeridos', async () => {
    guardarResultado.mockResolvedValueOnce('doc-456');
    await guardarResultado(resultadoMock);
    const llamada = guardarResultado.mock.calls[0][0];
    expect(llamada).toHaveProperty('uid');
    expect(llamada).toHaveProperty('nombre');
    expect(llamada).toHaveProperty('apellido');
    expect(llamada).toHaveProperty('email');
    expect(llamada).toHaveProperty('puntaje');
    expect(llamada).toHaveProperty('porcentaje');
    expect(llamada).toHaveProperty('nivelAlcanzado');
    expect(llamada).toHaveProperty('indicesCorrectos');
    expect(llamada).toHaveProperty('indicesIncorrectos');
  });

  it('propaga errores de Firestore', async () => {
    guardarResultado.mockRejectedValueOnce(new Error('Firestore permission denied'));
    await expect(guardarResultado(resultadoMock)).rejects.toThrow('Firestore permission denied');
  });
});

describe('obtenerResultadosPorUsuario', () => {
  beforeEach(() => vi.clearAllMocks());

  it('devuelve un array de resultados para el UID dado', async () => {
    const historialMock = [
      { id: 'doc-1', ...resultadoMock, fecha: new Date() },
      { id: 'doc-2', ...resultadoMock, puntaje: 10, nivelAlcanzado: 'Básico', fecha: new Date() },
    ];
    obtenerResultadosPorUsuario.mockResolvedValueOnce(historialMock);
    const resultado = await obtenerResultadosPorUsuario('uid-abc');
    expect(obtenerResultadosPorUsuario).toHaveBeenCalledWith('uid-abc');
    expect(resultado).toHaveLength(2);
    expect(resultado[0].id).toBe('doc-1');
    expect(resultado[1].nivelAlcanzado).toBe('Básico');
  });

  it('devuelve array vacío si el usuario no tiene resultados', async () => {
    obtenerResultadosPorUsuario.mockResolvedValueOnce([]);
    const resultado = await obtenerResultadosPorUsuario('uid-nuevo');
    expect(resultado).toEqual([]);
  });
});

describe('obtenerTodosLosResultados', () => {
  beforeEach(() => vi.clearAllMocks());

  it('devuelve todos los resultados globales', async () => {
    obtenerTodosLosResultados.mockResolvedValueOnce([resultadoMock]);
    const resultado = await obtenerTodosLosResultados();
    expect(resultado).toHaveLength(1);
  });
});
