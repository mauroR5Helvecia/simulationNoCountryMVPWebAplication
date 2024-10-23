package com.backend.server.controller;

import com.backend.server.DTO.ReservaDTO;
import com.backend.server.DTO.ResponseDTOReserva;
import com.backend.server.entity.Reserva;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.javaMailSender.EmailServiceImpl;
import com.backend.server.service.serviceReserva.ReservaServiceImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reserva")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {


    @Autowired
    private ReservaServiceImplement reservaService;

    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/nueva")
    public ResponseEntity<ResponseDTOReserva> createReserva(@RequestBody ReservaDTO reservaDTO) {
        try {
            // Convertir el DTO a entidad
            Reserva reserva = reservaService.convertToEntity(reservaDTO);

            // Crear la reserva en la base de datos
            Reserva nuevaReserva = reservaService.createReserva(reserva);

            // Convertir la reservs a un ResponseDTOReserva
            ResponseDTOReserva responseDTO = reservaService.convertToResponseDTOReserva(nuevaReserva);

            // Enviar emails tanto al usuario como al prestador de servicio
            emailService.sendReservaEmailToUsuario(responseDTO);
            emailService.sendReservaEmailToPrestador(responseDTO);

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (InvalidDataException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (DatabaseException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}