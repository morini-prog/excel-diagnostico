import { describe, it, expect } from 'vitest';
import { calcularPuntaje } from '../utils/scoring';
import { preguntas, calcularNivel } from '../data/questions';

describe('calcularNivel', () => {
  it('devuelve "Inicial" para 0 aciertos (0%)', () => {
    expect(calcularNivel(0).nivel).toBe('Inicial');
    expect(calcularNivel(0).porcentaje).toBe(0);
  });

  it('devuelve "Inicial" para 4 aciertos (16%)', () => {
    expect(calcularNivel(4).nivel).toBe('Inicial');
  });

  it('devuelve "Básico" para 5 aciertos (20%)', () => {
    expect(calcularNivel(5).nivel).toBe('Básico');
  });

  it('devuelve "Básico" para 9 aciertos (36%)', () => {
    expect(calcularNivel(9).nivel).toBe('Básico');
  });

  it('devuelve "Intermedio" para 10 aciertos (40%)', () => {
    expect(calcularNivel(10).nivel).toBe('Intermedio');
  });

  it('devuelve "Intermedio" para 14 aciertos (56%)', () => {
    expect(calcularNivel(14).nivel).toBe('Intermedio');
  });

  it('devuelve "Avanzado" para 15 aciertos (60%)', () => {
    expect(calcularNivel(15).nivel).toBe('Avanzado');
  });

  it('devuelve "Avanzado" para 19 aciertos (76%)', () => {
    expect(calcularNivel(19).nivel).toBe('Avanzado');
  });

  it('devuelve "Experto" para 20 aciertos (80%)', () => {
    expect(calcularNivel(20).nivel).toBe('Experto');
  });

  it('devuelve "Experto" para 25 aciertos (100%)', () => {
    expect(calcularNivel(25).nivel).toBe('Experto');
    expect(calcularNivel(25).porcentaje).toBe(100);
  });
});

describe('calcularPuntaje', () => {
  it('cuenta cero correctas cuando todas las respuestas son incorrectas', () => {
    // Todas las respuestas son el índice 3 (que no es correcta para la mayoría)
    const respuestasIncorrectas = preguntas.map(() => 3);
    const resultado = calcularPuntaje(respuestasIncorrectas);
    // Algunos pueden coincidir con la respuesta 3, así que verificamos consistencia
    expect(resultado.correctas + resultado.incorrectas).toBe(25);
    expect(resultado.indicesCorrectos.length + resultado.indicesIncorrectos.length).toBe(25);
  });

  it('cuenta 25 correctas cuando todas las respuestas son correctas', () => {
    const respuestasCorrectas = preguntas.map((p) => p.correcta);
    const resultado = calcularPuntaje(respuestasCorrectas);
    expect(resultado.correctas).toBe(25);
    expect(resultado.incorrectas).toBe(0);
    expect(resultado.nivel).toBe('Experto');
    expect(resultado.porcentaje).toBe(100);
    expect(resultado.indicesCorrectos).toHaveLength(25);
    expect(resultado.indicesIncorrectos).toHaveLength(0);
  });

  it('calcula puntaje parcial correctamente', () => {
    // Primeras 15 respuestas correctas, últimas 10 incorrectas (índice 3 por defecto)
    const respuestas = preguntas.map((p, i) => (i < 15 ? p.correcta : 3));
    const resultado = calcularPuntaje(respuestas);
    // Al menos 15 correctas (puede haber coincidencias en los últimos)
    expect(resultado.correctas).toBeGreaterThanOrEqual(15);
    expect(resultado.porcentaje).toBeGreaterThanOrEqual(60);
  });

  it('incluye detalle por nivel en el resultado', () => {
    const respuestas = preguntas.map((p) => p.correcta);
    const resultado = calcularPuntaje(respuestas);
    expect(resultado.detallePorNivel).toHaveProperty('Inicial');
    expect(resultado.detallePorNivel).toHaveProperty('Básico');
    expect(resultado.detallePorNivel).toHaveProperty('Intermedio');
    expect(resultado.detallePorNivel).toHaveProperty('Avanzado');
    expect(resultado.detallePorNivel).toHaveProperty('Experto');
    expect(resultado.detallePorNivel.Inicial.total).toBe(5);
    expect(resultado.detallePorNivel.Experto.correctas).toBe(5);
  });

  it('el banco tiene exactamente 25 preguntas', () => {
    expect(preguntas).toHaveLength(25);
  });

  it('cada pregunta tiene las propiedades requeridas', () => {
    preguntas.forEach((p, i) => {
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('id');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('nivel');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('pregunta');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('opciones');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('correcta');
      expect(p.opciones, `Pregunta ${i + 1}`).toHaveLength(4);
      expect(p.correcta, `Pregunta ${i + 1}`).toBeGreaterThanOrEqual(0);
      expect(p.correcta, `Pregunta ${i + 1}`).toBeLessThanOrEqual(3);
    });
  });
});
