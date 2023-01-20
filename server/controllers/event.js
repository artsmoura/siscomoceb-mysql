import { db } from '../db.js';

export const getEvents = (_, res) => {
    const q = "SELECT * FROM evento ORDER BY dataHoraInicio DESC";

    db.query(q, (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    });
};

export const getEvent = (req, res) => {
    const q = "SELECT * FROM evento WHERE `idEvento` = ?";

    db.query(q, [req.params.id], (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    });
};

export const createEvent = (req, res) => {
    const q =
        "INSERT INTO evento (idEvento, nivel, idLider, nomeEvento, descricaoEvento, tema, dataHoraInicio, dataHoraFim, localEvento, programacao, mapa, folder, dataHoraInicioInscricao, dataHoraFimInscricao, idadeMinima, numeroMaxParcelas, diaVencimento, habilitarReparcelamento, habilitarCancelarInscricao, excluido, dataCadastro) VALUES(?)";

    const values = [
        req.body.nomeEvento,
        req.body.descricaoEvento,
        req.body.tema,
        req.body.dataHoraInicio,
        req.body.dataHoraFim,
        req.body.localEvento,
        req.body.dataHoraInicioInscricao,
        req.body.dataHoraFimInscricao
    ];

    db.query(q, [values], (error) => {
        if (error) return res.json(error);

        return res.status(200).json("Evento criado com sucesso");
    });
};

export const updateEvent = (req, res) => {
    const q = "UPDATE evento SET `nome` = ? WHERE `idEvento` = ?";

    const values = [
        req.body.nomeEvento
    ];

    db.query(q, [...values, req.params.id], (error) => {
        if (error) return res.json(error);

        return res.status(200).json("Evento atualizado com sucesso");
    });
};

export const deleteEvent = (req, res) => {
    const q = "DELETE FROM evento WHERE `idEvento` = ?";

    db.query(q, [req.params.id], (error) => {
        if (error) return res.json(error);

        return res.status(200).json("Evento deletado com sucesso");
    });
};