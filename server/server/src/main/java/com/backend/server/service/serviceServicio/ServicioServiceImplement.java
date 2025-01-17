package com.backend.server.service.serviceServicio;
import com.backend.server.DTO.ServicioCardReservaDTO;
import com.backend.server.DTO.ServicioMapper.MapServicioCardReservaDTO;
import com.backend.server.repository.ServicioRepository;
import com.backend.server.entity.Servicio;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import com.backend.server.util.EnumNombreServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicioServiceImplement implements ServicioServiceInterface {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MapServicioCardReservaDTO mapServicioCardReservaDTO;

    @Override
    public List<Servicio> getAllServicios() {
        try {
            return servicioRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener la lista de servicios", e);
        }
    }

    @Override
    public Servicio saveServicio(Servicio servicio) {
        try {
            Usuario usuarioPrestador = usuarioRepository.findById(servicio.getPrestadorServicio().getIdUsuario())
                    .orElseThrow(() -> new NotFoundException("Usuario no encontrado con ID: " + servicio.getPrestadorServicio().getIdUsuario()));
            servicio.setPrestadorServicio(usuarioPrestador);

            // Imprimir el servicio antes de guardarlo
            System.out.println("Servicio a guardar: " + servicio);

            return servicioRepository.save(servicio);
        } catch (IllegalArgumentException e) {
            throw new InvalidDataException("Los datos proporcionados para el servicio no son válidos");
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el stack trace completo para obtener más detalles
            throw new DatabaseException("Error al guardar el servicio", e);
        }
    }

    @Override
    public void deleteServicioById(Long id) {
        try {
            if (!servicioRepository.existsById(id)) {
                throw new NotFoundException("El servicio con ID " + id + " no fue encontrado.");
            }
            servicioRepository.deleteById(id);
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al eliminar el servicio", e);
        }
    }

    @Override
    public Optional<Servicio> findServicioById(Long id) {
        try {
            return servicioRepository.findById(id)
                    .or(() -> {
                        throw new NotFoundException("El servicio con ID " + id + " no fue encontrado.");
                    });
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar el servicio", e);
        }
    }

    @Override
    public List<Servicio> findServicioByNombreAndFechaTurno(String nombreServicio, LocalDate fechaTurno) {
       try{
           List<Servicio> servicios = servicioRepository.findByNombreServicioContaining(nombreServicio);
           List<Servicio> serviciosConTurnosDisponibles = new ArrayList<>();

           for (Servicio servicio : servicios) {
               boolean tieneTurnosDisponibles = servicio.getTurnosDisponibles().stream()
                       .anyMatch(turno -> turno.getFechaTurno().isEqual(fechaTurno) && !turno.isReservadoTurno());

               if (tieneTurnosDisponibles) {
                   serviciosConTurnosDisponibles.add(servicio);
               }
           }

           return serviciosConTurnosDisponibles;
       } catch (Exception e){
        throw new DatabaseException("Error al buscar el servicio", e);
       }
    }

    @Override
    public List<Servicio> findServiciosByUsuarioId(Long idUsuario) {
        try{

            Usuario usuario = usuarioRepository.findById(idUsuario).
                    orElseThrow(() -> new NotFoundException("Usuario no encontrado con ID: "));
            return servicioRepository.findByPrestadorServicio(usuario);
        } catch (Exception e){
            throw new DatabaseException("Error al buscar el servicio por usuario", e);
        }
    }

    @Override
    public List<ServicioCardReservaDTO> findServicioByNombreServicio(EnumNombreServicio nombreServicio) {
        try {
            // Obtener la lista de servicios por nombre
            List<Servicio> servicios = servicioRepository.findByNombreServicio(nombreServicio);

            // mapear la lista de servicios a DTOs
            return mapServicioCardReservaDTO.mapServiciosToDTO(servicios);
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar los servicios por nombre de servicio", e);
        }
    }

    @Override
    public List<ServicioCardReservaDTO> findServicioramdom() {
        try {
            // Obtener la lista de servicios
            List<Servicio> servicios = servicioRepository.findAll();

            // Si no hay servicios, devolver una lista vacía
            if (servicios.isEmpty()) {
                return new ArrayList<>();
            }

            // Mezclar aleatoriamente la lista de servicios
            Collections.shuffle(servicios);

            // Limitar la lista a un máximo de 10 servicios
            List<Servicio> serviciosLimitados = servicios.stream()
                    .limit(10)
                    .collect(Collectors.toList());

            // Mapear la lista de servicios a DTOs
            return mapServicioCardReservaDTO.mapServiciosToDTO(serviciosLimitados);

        } catch (Exception e) {
            throw new DatabaseException("Error al buscar los servicios por nombre de servicio", e);
        }
    }



}
