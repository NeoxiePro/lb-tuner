local identifier = "lb-tuner"

-- Esperar o lb-phone iniciar
while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

-- Função para adicionar a app personalizada ao telemóvel
local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier,
        name = "RedSuns Tuner",
        description = "Vehicle performance data",
        developer = "Neoxie Feat Coffeelot",
        defaultApp = false,
        size = 59812, -- certifica-te que este valor é o correto do conteúdo UI
        ui = GetCurrentResourceName() .. "/ui/index.html",
        icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/assets/icon.png",
        fixBlur = true,
    })

    if not added then
        print("^1[LB-TUNER] Failed to add app:^0", errorMessage)
    else
        print("^2[LB-TUNER] App added successfully!^0")
    end
end

-- Chamar a função ao iniciar o resource
CreateThread(function()
    addApp()
end)

-- Recarregar a app caso o lb-phone reinicie
AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        addApp()
    end
end)

-- Comando temporário para testes manuais
RegisterCommand("opentuner", function()
    exports["lb-phone"]:SendCustomAppMessage("lb-tuner", {
        action = "open"
    })
end)

-- Callback da NUI para atualizar info do veículo
RegisterNUICallback("UpdateVehicle", function(_, cb)
    local vehicle = GetPlayersLastVehicle()

    if DoesEntityExist(vehicle) then
        local info, class, perfRating = exports["nxg-performance"]:getVehicleInfo(vehicle)
        if info then
            local model = GetLabelText(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)))
            local brand = GetMakeNameFromVehicleModel(GetEntityModel(vehicle))

            cb({
                brand = brand,
                rating = class .. "" .. perfRating,
                accel = math.floor(info.accel * 10) / 10,
                speed = math.floor(info.speed * 10) / 10,
                handling = math.floor(info.handling * 10) / 10,
                braking = math.floor(info.braking * 10) / 10,
                drivetrain = info.drivetrain,
                model = model
            })
        else
            cb({})
        end
    else
        cb({})
    end
end)