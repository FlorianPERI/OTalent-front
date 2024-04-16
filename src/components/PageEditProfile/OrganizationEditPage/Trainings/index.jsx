import React, { useState } from 'react';
import TrainingCard from '../../../HomePage/TrainingCard';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../store/redux-hook/hook';
import { getstateModalEditTraining } from '../../../../store/actions/modalEditTrainingAction';
import ModalTraining from '../modalTraining';
import { requestWithVariable } from '../../../../utils';
import { queryDeleteTraining } from '../../../../query';

export default function OrganizationTrainings({ data }) {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.editTraining.isOpen);
    const [openModalAcceptToDelete, setOpenModalAcceptToDelete] =
        useState(false);

    const openModal = (trainingId) => {
        dispatch(
            getstateModalEditTraining({ isOpen: true, trainingId: trainingId })
        );
    };

    if (!data || !data.trainings) {
        return <section>Aucune formation disponible</section>;
    }

    const openModalToCreateTraining = () => {
        dispatch(getstateModalEditTraining({ isOpen: true, trainingId: null }));
    };

    const deleteTraining = async (e) => {
        const idToDelete = e.target.id;

        const variables = {
            deleteTrainingId: idToDelete,
        };
        await requestWithVariable(queryDeleteTraining, variables);
        location.reload();
    };

    return (
        <section>
            <div className="flex justify-center">
                <button
                    onClick={openModalToCreateTraining}
                    className="btn m-10 w-1/2 md:w-1/4 text-md md:text-xl">
                    Créer une formation
                </button>
            </div>
            {!isOpen && (
                <>
                <div></div>
                    {data.trainings.length > 0 && (
                        <>
                            <div className="flex gap-5 overflow-auto p-10">
                                {data.trainings.map((training, index) => (
                                    <div
                                        key={training.id}
                                        className="w-[308px]">
                                        <TrainingCard
                                            key={training.id}
                                            label={training.label}
                                            dateCreated={''}
                                            duration={training.duration}
                                            category={training.category.label}
                                            image={training.image}
                                            categoryId={training.category.id}
                                            organization={data.name}
                                            trainingId={training.id}
                                            organizationId={data.id}
                                            reviews={training.reviews}
                                            price={training.price}
                                        />
                                        <div className="flex flex-col gap-2 justify-around mt-2">
                                            <div>
                                                <button
                                                    key={training.id}
                                                    onClick={() => {
                                                        openModal(training.id);
                                                    }}
                                                    id={training.id}
                                                    className="material-symbols-rounded">
                                                    edit
                                                </button>
                                                <button
                                                    key={training.id}
                                                    id={training.id}
                                                    onClick={() => {
                                                        setOpenModalAcceptToDelete(
                                                            true
                                                        );
                                                    }}
                                                    className="material-symbols-rounded">
                                                    delete
                                                </button>
                                            </div>
                                            {openModalAcceptToDelete && (
                                                <div>
                                                    <p>
                                                        Voulez-vous vraiment
                                                        supprimer cette
                                                        formation ?
                                                    </p>
                                                    <button
                                                        key={training.id}
                                                        id={training.id}
                                                        onClick={deleteTraining}
                                                        className="btn btn-outline btn-error">
                                                        OUI
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setOpenModalAcceptToDelete(
                                                                false
                                                            );
                                                        }}
                                                        className="btn">
                                                        NON
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
            <ModalTraining />
        </section>
    );
}
