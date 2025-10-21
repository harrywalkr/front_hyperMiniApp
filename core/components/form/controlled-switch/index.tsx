'use client';
import { Controller, useFormContext } from 'react-hook-form';
import type { ControlledSwitchCmProps } from './types';
import { Switch } from '@heroui/switch';

export const ControlledSwitch: React.FC<ControlledSwitchCmProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name ?? ''}
            control={control}
            render={({ field, fieldState }) => (
                <Switch
                    {...field}
                    isSelected={field.value}
                    classNames={{
                        label: 'text-foreground-600 text-sm',
                    }}
                    {...props}
                >
                    {label}
                </Switch>
            )}
        />
    );
};
