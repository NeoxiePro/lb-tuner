let vehicle

SetupDetailsTuner = function(data) {
    let dt = '';
    if ( data.drivetrain == 1.0 ) {
        dt = 'FWD'
    }
    else if ( data.drivetrain == 0.0) {
        dt = 'RWD'
    }
    else {
        dt = 'AWD (' +  Math.round(data.drivetrain * 10) / 10 + ')'
    }

    if(!data.model){
        $("#tuner-brand").find(".tuner-answer").html('');
        $("#tuner-model").find(".tuner-answer").html('');
        $("#tuner-rating").find(".tuner-answer").html('');
        $("#tuner-accel").find(".tuner-answer").html('');
        $("#tuner-speed").find(".tuner-answer").html('');
        $("#tuner-handling").find(".tuner-answer").html('');
        $("#tuner-braking").find(".tuner-answer").html('');
        $("#tuner-drivetrain").find(".tuner-answer").html('');
        $("#resposta").find(".tuner-answer").html('Estás a tentar conduzir o ar? Entra num carro.');
    }
    else {
        $("#resposta").find(".tuner-answer").html('');
        $("#tuner-brand").find(".tuner-answer").html(data.brand);
        $("#tuner-model").find(".tuner-answer").html(data.model);
        $("#tuner-rating").find(".tuner-answer").html(data.rating);
        $("#tuner-accel").find(".tuner-answer").html(data.accel);
        $("#tuner-speed").find(".tuner-answer").html(data.speed);
        $("#tuner-handling").find(".tuner-answer").html(data.handling);
        $("#tuner-braking").find(".tuner-answer").html(data.braking);
        $("#tuner-drivetrain").find(".tuner-answer").html(dt);
    }
}

function InitializeVehicle(whip) {
    
    $("#tuner-brand").find(".tuner-answer").html('');
    $("#tuner-model").find(".tuner-answer").html('');
    $("#tuner-rating").find(".tuner-answer").html('');
    $("#tuner-accel").find(".tuner-answer").html('');
    $("#tuner-speed").find(".tuner-answer").html('');
    $("#tuner-handling").find(".tuner-answer").html('');
    $("#tuner-braking").find(".tuner-answer").html('');
    $("#tuner-drivetrain").find(".tuner-answer").html('');
    if (whip != null) {
        SetupDetailsTuner(whip)
    }
}

window.addEventListener("message", function(event) {
    const data = event.data;
    if (data.app !== "lb-tuner") return;

    if (data.action === "componentsLoaded") {
        $(".tuner-app").fadeIn();
    
        // Pede ao Lua os dados do veículo
        $.post('https://lb-tuner/UpdateVehicle', JSON.stringify({}), function(vehicle){
            InitializeVehicle(vehicle);
        });
    }
});

$(document).on('click', '.tuner-reload', function(e){
    e.preventDefault();

    $.post('https://lb-tuner/UpdateVehicle', JSON.stringify({}), function(vehicle){
        InitializeVehicle(vehicle);
    });
});