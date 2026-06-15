import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Tests del flujo de autenticación.
 * Usan mocks de Firebase para no requerir conexión real.
 */

// Mock del módulo de autenticación
vi.mock('../firebase/auth', () => ({
  registrarUsuario: vi.fn(),
  iniciarSesion: vi.fn(),
  cerrarSesion: vi.fn(),
}));

import { registrarUsuario, iniciarSesion, cerrarSesion } from '../firebase/auth';

describe('Flujo de autenticación', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registrarUsuario llama correctamente con los parámetros esperados', async () => {
    registrarUsuario.mockResolvedValueOnce({
      user: {
        uid: 'uid-test-123',
        email: 'juan@ejemplo.com',
        displayName: 'Juan García',
      },
    });

    const result = await registrarUsuario('Juan', 'García', 'juan@ejemplo.com', 'password123');
    expect(registrarUsuario).toHaveBeenCalledWith('Juan', 'García', 'juan@ejemplo.com', 'password123');
    expect(result.user.uid).toBe('uid-test-123');
    expect(result.user.displayName).toBe('Juan García');
  });

  it('iniciarSesion llama con email y contraseña', async () => {
    iniciarSesion.mockResolvedValueOnce({
      user: { uid: 'uid-test-456', email: 'maria@ejemplo.com' },
    });

    const result = await iniciarSesion('maria@ejemplo.com', 'clave456');
    expect(iniciarSesion).toHaveBeenCalledWith('maria@ejemplo.com', 'clave456');
    expect(result.user.email).toBe('maria@ejemplo.com');
  });

  it('iniciarSesion propaga errores de Firebase correctamente', async () => {
    const error = Object.assign(new Error('auth/invalid-credential'), {
      code: 'auth/invalid-credential',
    });
    iniciarSesion.mockRejectedValueOnce(error);

    await expect(iniciarSesion('wrong@example.com', 'wrongpass')).rejects.toThrow();
    expect(iniciarSesion).toHaveBeenCalledTimes(1);
  });

  it('cerrarSesion se ejecuta sin parámetros', async () => {
    cerrarSesion.mockResolvedValueOnce(undefined);
    await cerrarSesion();
    expect(cerrarSesion).toHaveBeenCalledTimes(1);
  });

  it('registrarUsuario propaga error de email duplicado', async () => {
    const error = Object.assign(new Error('auth/email-already-in-use'), {
      code: 'auth/email-already-in-use',
    });
    registrarUsuario.mockRejectedValueOnce(error);

    await expect(
      registrarUsuario('Ana', 'López', 'ana@ejemplo.com', 'pass123')
    ).rejects.toMatchObject({ code: 'auth/email-already-in-use' });
  });
});
