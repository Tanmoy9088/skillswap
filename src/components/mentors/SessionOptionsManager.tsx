// components/SessionOptionsManager.tsx

"use client";

import { useState } from "react";
import { Check, Clock3, Coins, Loader2, Pencil, Plus, X } from "lucide-react";

import { useMySessionOptions } from "@/hooks/skills/useMySessionOptions";

import { useCreateSessionOption } from "@/hooks/skills/useCreateSessionOption";

import { useUpdateSessionOption } from "@/hooks/skills/useUpdateSessionOption";

import { useDeactivateSessionOption } from "@/hooks/skills/useDeactivateSessionOption";

import type { SessionDuration, UserSkillSession } from "@/types/types/swaps";

/*
============================================================
AVAILABLE DURATIONS
============================================================
*/

const DURATIONS: SessionDuration[] = [30, 45, 60, 90, 120];

/*
============================================================
PROPS
============================================================
*/

interface SessionOptionsManagerProps {
  userSkillId: string;
}

/*
============================================================
COMPONENT
============================================================
*/

export default function SessionOptionsManager({
  userSkillId,
}: SessionOptionsManagerProps) {
  const {
    data: sessionOptions = [],
    isLoading,
    isError,
  } = useMySessionOptions(userSkillId);

  const createMutation = useCreateSessionOption();

  const updateMutation = useUpdateSessionOption();

  const deactivateMutation = useDeactivateSessionOption();

  /*
   * Form visibility.
   */
  const [showForm, setShowForm] = useState(false);

  /*
   * Editing option.
   */
  const [editingOption, setEditingOption] = useState<UserSkillSession | null>(
    null,
  );

  /*
   * Form values.
   */
  const [durationMinutes, setDurationMinutes] = useState<SessionDuration>(60);

  const [tokenRate, setTokenRate] = useState("");

  /*
   * Local validation error.
   */
  const [formError, setFormError] = useState("");

  /*
   * Reset form.
   */
  const resetForm = () => {
    setDurationMinutes(60);
    setTokenRate("");
    setFormError("");
    setEditingOption(null);
    setShowForm(false);
  };

  /*
   * Start editing.
   */
  const handleEdit = (option: UserSkillSession) => {
    setEditingOption(option);

    setDurationMinutes(option.duration_minutes);

    setTokenRate(String(option.token_rate));

    setFormError("");

    setShowForm(true);
  };

  /*
   * Submit.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError("");

    /*
     * Validate token rate.
     */
    const parsedTokenRate = Number(tokenRate);

    if (tokenRate.trim() === "" || !Number.isFinite(parsedTokenRate)) {
      setFormError("Please enter a valid token amount.");

      return;
    }

    if (parsedTokenRate < 0) {
      setFormError("Token amount cannot be negative.");

      return;
    }

    /*
     * CREATE
     */
    if (!editingOption) {
      const alreadyExists = sessionOptions.some(
        (option) => option.duration_minutes === durationMinutes,
      );

      if (alreadyExists) {
        setFormError(`${durationMinutes}-minute session already exists.`);

        return;
      }

      try {
        await createMutation.mutateAsync({
          userSkillId,

          durationMinutes,

          tokenRate: parsedTokenRate,
        });

        resetForm();
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Failed to create session option.",
        );
      }

      return;
    }

    /*
     * UPDATE
     */
    try {
      await updateMutation.mutateAsync({
        sessionOptionId: editingOption.id,

        userSkillId,

        durationMinutes,

        tokenRate: parsedTokenRate,
      });

      resetForm();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to update session option.",
      );
    }
  };

  /*
   * Deactivate option.
   */
  const handleDeactivate = async (option: UserSkillSession) => {
    const confirmed = window.confirm(
      `Remove the ${option.duration_minutes}-minute session option? Existing bookings will not be affected.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync({
        sessionOptionId: option.id,

        userSkillId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Loading.
   */
  if (isLoading) {
    return (
      <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={16} className="animate-spin" />
          Loading session options...
        </div>
      </div>
    );
  }

  /*
   * Error.
   */
  if (isError) {
    return (
      <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
        <p className="text-sm text-red-600">Unable to load session options.</p>
      </div>
    );
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="mt-5 border-t border-gray-100 pt-5">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3 size={17} className="text-indigo-600" />

            <h4 className="font-semibold text-gray-900">Session Options</h4>
          </div>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Set the duration and token price learners can choose when booking
            your sessions.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => {
              setEditingOption(null);
              setDurationMinutes(60);
              setTokenRate("");
              setFormError("");
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={16} />
            Add Option
          </button>
        )}
      </div>

      {/* ================================================= */}
      {/* EXISTING OPTIONS */}
      {/* ================================================= */}

      {sessionOptions.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {sessionOptions.map((option) => (
            <div
              key={option.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                    <Clock3 size={18} className="text-indigo-600" />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      {option.duration_minutes} minutes
                    </p>

                    <p className="mt-0.5 flex items-center gap-1 text-sm text-indigo-600">
                      <Coins size={14} />
                      {option.token_rate} tokens
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(option)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    aria-label="Edit session option"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeactivate(option)}
                    disabled={deactivateMutation.isPending}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Remove session option"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-5 text-center">
          <Clock3 size={22} className="mx-auto text-indigo-400" />

          <p className="mt-2 text-sm font-semibold text-gray-700">
            No session options yet
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Add at least one duration and token price so learners can book your
            skill.
          </p>
        </div>
      )}

      {/* ================================================= */}
      {/* ADD / EDIT FORM */}
      {/* ================================================= */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-gray-900">
                {editingOption ? "Edit Session Option" : "Add Session Option"}
              </h5>

              <p className="mt-1 text-xs text-gray-500">
                Choose how long the session lasts and how many tokens it costs.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-gray-700"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>

          {/* ================================================= */}
          {/* DURATION */}
          {/* ================================================= */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Session Duration
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {DURATIONS.map((duration) => {
                const selected = durationMinutes === duration;

                const exists =
                  !editingOption &&
                  sessionOptions.some(
                    (option) => option.duration_minutes === duration,
                  );

                return (
                  <button
                    key={duration}
                    type="button"
                    disabled={exists}
                    onClick={() => setDurationMinutes(duration)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                      selected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : exists
                          ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300"
                          : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    {duration} min
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================= */}
          {/* TOKEN RATE */}
          {/* ================================================= */}

          <div className="mt-4">
            <label
              htmlFor={`token-rate-${userSkillId}`}
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Token Price
            </label>

            <div className="relative">
              <Coins
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id={`token-rate-${userSkillId}`}
                type="number"
                min="0"
                step="1"
                value={tokenRate}
                onChange={(event) => setTokenRate(event.target.value)}
                placeholder="Example: 10"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <p className="mt-1.5 text-xs text-gray-400">
              This is the number of tokens a learner pays for this session.
            </p>
          </div>

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {formError && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />

                  {editingOption ? "Save Changes" : "Add Option"}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
