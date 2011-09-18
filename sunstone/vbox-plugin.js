/* -------------------------------------------------------------------------- */
/* Copyright 2010-2011: Hector Sanjuan, David Rodríguez, Pablo Donaire        */
/*                                                                            */
/* Licensed under the Apache License, Version 2.0 (the "License"); you may    */
/* not use this file except in compliance with the License. You may obtain    */
/* a copy of the License at                                                   */
/*                                                                            */
/* http://www.apache.org/licenses/LICENSE-2.0                                 */
/*                                                                            */
/* Unless required by applicable law or agreed to in writing, software        */
/* distributed under the License is distributed on an "AS IS" BASIS,          */
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   */
/* See the License for the specific language governing permissions and        */
/* limitations under the License.                                             */
/* -------------------------------------------------------------------------- */

//This plugin hacks the vms-tab and the host-tab plugin to handle
//the VirtualBox driver


var vbox_create_vm_tmpl =
'<div id="vbox_template_create_tabs">\
    <ul>\
        <li><a href="#vbox_easy">Wizard VirtualBox</a></li>\
        <li><a href="#vbox_manual">Advanced mode</a></li>\
    </ul>\
    <div id="vbox_easy">\
        <form>\
            <div id="template_type" style="margin-bottom:1em;">\
                <p style="font-size:0.8em;text-align:right;"><i>Fields marked with <span style="display:inline-block;" class="ui-icon ui-icon-alert" /> are mandatory</i><br />\
                <a href="#" id="fold_unfold_vm_params"><u>Fold / Unfold all sections</u></a></p>\
            </div>\
\
            <!-- capacity section name, memory, cpu vcpu -->\
            <div class="vm_section" id="capacity">\
                <div class="show_hide" id="add_capacity_cb">\
                    <h3>Capacity options</h3>\
                </div>\
                <fieldset><legend>Capacity</legend>\
                    <div class="vm_param">\
                        <label for="NAME">Name:</label>\
                        <input type="text" id="NAME" name="name"/>\
                        <div class="tip">	Name that the VM will get for description purposes. If NAME is not supplied a name generated by one will be in the form of one-&lt;VID&gt;.</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="MEMORY">Memory:</label>\
                        <input type="text" id="MEMORY" name="memory" size="4" />\
                        <div class="tip">Amount of RAM required for the VM, in Megabytes.</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="CPU">CPU:</label>\
                        <input type="text" id="CPU" name="cpu" size="2"/>\
                        <div class="tip">Percentage of CPU divided by 100 required for the Virtual Machine. Half a processor is written 0.5.</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="VCPU">VCPU:</label>\
                        <input type="text" id="VCPU" name="vcpu" size="3" />\
                        <div class="tip">Number of virtual cpus. This value is optional, the default hypervisor behavior is used, usually one virtual CPU.</div>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!--DISKS SECTION -->\
            <div class="vm_section" id="disks">\
                <div class="show_hide" id="add_disks_cb">\
                    <h3>Add images <a id="add_disks" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Disks</legend>\
                    <div class="vm_param">\
                        <label for="IMAGE">Image:</label>\
                        <select type="text" id="IMAGE_ID" name="image_id">\
                        </select>\
                        <div class="tip">Name of the image to use</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="BUS">Bus:</label>\
                        <select id="BUS" name="bus">\
                            <option value="ide">IDE</option>\
                            <option value="sata">SATA</option>\
                            <option value="scsi">SCSI</option>\
                            <option value="floppy">Floppy</option>\
                            <option value="sas">SAS</option>\
                        </select>\
                        <div class="tip">Type of disk device to emulate: ide, scsi</div>\
                    </div>\
                    <div class="vm_param vbox">\
                        <label for="TARGET">Target:</label>\
                        <input type="text" id="TARGET" name="target" />\
                        <div class="tip">Device to map image disk. If set, it will overwrite the default device mapping</div>\
                    </div>\
                    <div class="">\
                        <button class="add_remove_button add_button" id="add_disk_button" value="add_disk">Add</button>\
                        <button class="add_remove_button" id="remove_disk_button" value="remove_disk">Remove selected</button>\
                        <div class="clear"></div>\
                        <label style="" for="disks_box">Current disks:</label>\
                        <select id="disks_box" name="disks_box" style="width:150px;height:100px;" multiple>\
                        </select>\
                        <div class="clear"></div>\
                    </div>\
                </fieldset>\
            </div>\
\
            <!-- NETWORK -->\
            <div class="vm_section" id="networks">\
                <div class="show_hide" id="add_networks_cb">\
                    <h3>Setup Networks <a id="add_networks" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Network</legend>\
                    <div class="vm_param network">\
                        <label for="NETWORK">Network:</label>\
                        <select type="text" id="NETWORK_ID" name="network_id">\
                        </select>\
                        <div class="tip">Name of the network to attach this device</div>\
                    </div>\
                    <div class="">\
                        <button class="add_remove_button add_button" id="add_nic_button" value="add_nic">Add</button>\
                        <button class="add_remove_button" id="remove_nic_button" value="remove_nic">Remove selected</button>\
                        <div class="clear"></div>\
                        <label for="nics_box">Current NICs:</label>\
                        <select id="nics_box" name="nics_box" style="width:150px;height:100px;" multiple>\
                        </select>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!--GRAPHICS -->\
            <div class="vm_section" id="graphics">\
                <div class="show_hide" id="add_graphics_cb">\
                    <h3>Add Graphics <a id="add_graphics" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Graphics</legend>\
                    <div class="vm_param">\
                        <label for="TYPE">Graphics type:</label>\
                        <select id="TYPE" name="">\
                            <option value="">Please select</option>\
                            <option value="sdl">SDL</option\>\
                            <option value="vrdp">VRDP</option>\
                        </select>\
                        <div class="tip">Select graphics</div>\
                    </div>\
                    <div class="vm_param vbox">\
                        <label for="LISTEN">Listen IP:</label>\
                        <input type="text" id="LISTEN" name="graphics_ip" />\
                        <div class="tip">IP to listen on</div>\
                    </div>\
                    <div class="vm_param vbox">\
                        <label for="PORT">Port:</label>\
                        <input type="text" id="PORT" name="port" />\
                        <div class="tip">Port for the vrdp connection</div>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!--CONTEXT -->\
            <div class="vm_section" id="context">\
                <div class="show_hide" id="add_context_cb">\
                    <h3>Add context variables <a id="add_context" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Context</legend>\
                    <div class="vm_param">\
                        <label for="var_name">Name:</label>\
                        <input type="text" id="var_name" name="var_name" />\
                        <div class="tip">Name for the context variable</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="var_value">Value:</label>\
                        <input type="text" id="var_value" name="var_value" />\
                        <div class="tip">Value of the context variable</div>\
                    </div>\
                    <div class="">\
                        <button class="add_remove_button add_button" id="add_context_button" value="add_context">Add</button>\
                        <button class="add_remove_button" id="remove_context_button" value="remove_input">Remove selected</button>\
                        <div class="clear"></div>\
                        <label for="context_box">Current variables:</label>\
                        <select id="context_box" name="context_box" style="width:150px;height:100px;" multiple>\
                        </select>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!-- PLACEMENT Opts -->\
            <div class="vm_section" id="placement">\
                <div class="show_hide" id="add_placement_cb">\
                    <h3>Add placement options <a id="add_placement" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Placement</legend>\
                    <div class="vm_param">\
                        <label for="REQUIREMENTS">Requirements:</label>\
                        <input type="text" id="REQUIREMENTS" name="requirements" />\
                        <div class="tip">Boolean expression that rules out provisioning hosts from list of machines suitable to run this VM</div>\
                    </div>\
                    <div class="vm_param">\
                        <label for="RANK">Rank:</label>\
                        <input type="text" id="RANK" name="rank" />\
                        <div class="tip">This field sets which attribute will be used to sort the suitable hosts for this VM. Basically, it defines which hosts are more suitable than others</div>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!--RAW section-->\
            <div class="vm_section" id="raw">\
                <div class="show_hide" id="add_raw_cb">\
                    <h3>Add Hypervisor raw options <a id="add_raw" class="icon_left" href="#"><span class="ui-icon ui-icon-plus" /></a></h3>\
                </div>\
                <fieldset><legend>Raw</legend>\
                    <div class="vm_params">\
                        <label for="DATA">Data:</label>\
                        <input type="hidden" id="TYPE" name="type" value="vbox"/>\
                        <input type="text" id="DATA" name="data" />\
                        <div class="tip">Arguments passed to VBoxManage modifyvm</div>\
                    </div>\
                </fieldset>\
            </div>\
\
\
            <!-- submit -->\
            <fieldset>\
                <div class="form_buttons">\
                    <button class="button" id="create_template_form_easy" value="OpenNebula.Template.create">\
                    Create\
                    </button>\
                    <button class="button" id="reset_template_form" type="reset" value="reset">Reset</button>\
                </div>\
            </fieldset>\
        </form>\
    </div><!--easy mode -->\
\
\
    <!-- MANUAL MODE -->\
    <div id="vbox_manual">\
        <form>\
            <h3 style="margin-bottom:10px;">Write the Virtual Machine template here</h3>\
            <fieldset style="border-top:none;">\
                <textarea id="textarea_vm_template" style="width:100%; height:15em;"></textarea>\
                <div class="clear"></div>\
            </fieldset>\
            <fieldset>\
                <div class="form_buttons">\
                    <button class="button" id="create_template_form_manual" value="OpenNebula.Template.create">\
                    Create\
                    </button>\
                    <button class="button" type="reset" value="reset">Reset</button>\
                </div>\
            </fieldset>\
        </form>\
    </div>\
</div>';
/*var create_host_action = {
    type:"custom",
    call:popUpCreateVBoxHostDialog
}*/

var create_vm_action = {
    type:"custom",
    call:popUpCreateVBoxVMDialog
}

//Sunstone.updateAction("Host.create_dialog",create_host_action);
Sunstone.updateAction("Template.create_dialog",create_vm_action);

/*
function popUpCreateVBoxHostDialog(){
    $('#create_vbox_host_dialog').dialog('open');
    return false;
}*/

function popUpCreateVBoxVMDialog(){
    var select_imgs = makeSelectOptions(dataTable_images,
                                   1,
                                   4,
                                   [9,9,9],
                                   ["DISABLED","LOCKED","ERROR"]
                                  );
    var select_nets = makeSelectOptions(dataTable_vNetworks,
                                        1,
                                        4,
                                        [],
                                        []
                                       );

    $('#vbox_create_template_dialog div.vm_section#disks select#IMAGE_ID').html(select_imgs);
    $('#vbox_create_template_dialog div.vm_section#networks select#NETWORK_ID').html(select_nets);
    $('#vbox_create_template_dialog').dialog('open');
    return false;
}

function setupCreateVBoxHostDialog(){
    //steal host template
    var $create_vbox = $('#create_host_form');

    $('select#vmm_mad',$create_vbox).prepend('\
        <option value="vmm_vbox" selected="selected">VirtualBox</option>\
        ');

    $('select#im_mad',$create_vbox).prepend('\
        <option value="im_vbox" selected="selected">VirtualBox</option>\
        ');

    /*
    $('div#dialogs').append('<div title="Create host" id="create_vbox_host_dialog"></div>');
    $('div#create_vbox_host_dialog').html($create_vbox.html());
    $('#create_vbox_host_dialog').dialog({
        autoOpen: false,
        modal: true,
        width: 500
    });

    $('#create_vbox_host_dialog button').button();
    */
    //form handling is still done by the hosts plugin
}

function setupCreateVBoxVMDialog(){

    var mandatory_filter = function(context){
        var man_items = ".vbox";

        //find enabled mandatory items in this context
        man_items = $(man_items+' input:visible, '+man_items+' select:visible',context);
        var r = true;

        //we fail it the item is enabled and has no value
        $.each(man_items,function(){
            if ($(this).parents(".vm_param").attr("disabled") ||
                !($(this).val().length)) {
                r = false;
                return false;
            };
        });
        return r;
    }

    //Removes selected elements from a multiple select box
    var box_remove_element = function(section_tag,box_tag){
        var context = $(section_tag);
        $('select'+box_tag+' :selected',context).remove();
        return false;
    };

    //Given the JSON of a VM template (or of a section of it), it crawls
    //the fields of certain section (context) and add their name and
    //values to the template JSON.
    var addSectionJSON = function(template_json,context){
        var params= $('.vm_param',context);
        var inputs= $('input:enabled',params);
        var selects = $('select:enabled',params);
        var fields = $.merge(inputs,selects);

        fields.each(function(){
            if (!($(this).parents(".vm_param").attr("disabled"))){ //if ! disabled
                if ($(this).val().length){ //if has a length
                    template_json[$(this).attr('id')]=$(this).val();
                }
            }
        });
    }

    var addBoxJSON = function(array,context,box_tag){
        $('select'+box_tag+' option',context).each(function(){
            array.push( JSON.parse($(this).val()) );
        });
    }

    var removeEmptyObjects = function(obj){
        for (elem in obj){
            var remove = false;
            var value = obj[elem];
            if (value instanceof Array)
            {
                if (value.length == 0)
                    remove = true;
            }
            else if (value instanceof Object)
            {
                var obj_length = 0;
                for (e in value)
                    obj_length += 1;
                if (obj_length == 0)
                    remove = true;
            }
            else
            {
                value = String(value);
                if (value.length == 0)
                    remove = true;
            }
            if (remove)
                delete obj[elem];
        }
        return obj;
    }

    var iconToggle = function(){
        $('#vbox_easy .icon_left').click(function(e){
            if ($('span',e.currentTarget).hasClass("ui-icon-plus")){
                $('span',e.currentTarget).removeClass("ui-icon-plus");
                $('span',e.currentTarget).addClass("ui-icon-minus");
            } else {
                $('span',e.currentTarget).removeClass("ui-icon-minus");
                $('span',e.currentTarget).addClass("ui-icon-plus");
            };
        });
    };

   //Fold/unfold all sections button
    var foldUnfoldToggle = function() {
        $('#fold_unfold_vm_params',$create_template_dialog).toggle(
            function(){
                $('.vm_section fieldset',$create_template_dialog).show();
                $('.icon_left span',$create_template_dialog).removeClass("ui-icon-plus");
                $('.icon_left span',$create_template_dialog).addClass("ui-icon-minus");
                return false;
            },
            function(){
                $('.vm_section fieldset',$create_template_dialog).hide();
                //Show capacity opts
                $('.vm_section fieldset',$create_template_dialog).first().show();
                $('.icon_left span',$create_template_dialog).removeClass("ui-icon-minus");
                $('.icon_left span',$create_template_dialog).addClass("ui-icon-plus");
                return false;
            });
    };


    var capacity_setup = function(){}

    var disks_setup = function(){
        $('fieldset',section_disks).hide();

        $('#add_disks', section_disks).click(function(){
            $('fieldset',section_disks).toggle();
            return false;
        });


        $('#add_disk_button',section_disks).click(function(){

            var image_id = $('#IMAGE_ID',section_disks).val();
            var bus = $('#BUS',section_disks).val();
            var target = $('#TARGET',section_disks).val();

            if (!image_id.length || !bus.length || !target.length){
                notifyError("There are mandatory fields missing in the disks section");
                return false;
            }

            var value = {   "IMAGE_ID"   : image_id,
                            "BUS"        : bus,
                            "TARGET"     : target }

            var value_string = JSON.stringify(value);
            var option= '<option value=\''+value_string+'\'>'+
                stringJSON(value)+
                '</option>';

            $('select#disks_box',section_disks).append(option);
            return false;
            });

        $('#remove_disk_button',section_disks).click(function(){
            box_remove_element(section_disks,'#disks_box');
            return false;
            });
    };

    var networks_setup = function(){

        $('fieldset',section_networks).hide();

        $('#add_networks',section_networks).click(function(){
            $('fieldset',section_networks).toggle();
            return false;
        });

        $('#add_nic_button',section_networks).click(function(){
            var network_id = $('#NETWORK_ID',section_networks).val();

            if (!network_id.length){
                notifyError("No network selected");
            }

            var value = { "NETWORK_ID" : network_id };
            var value_string = JSON.stringify(value);
            var option= '<option value=\''+value_string+'\'>'+
                stringJSON(value)+
                '</option>';

            $('select#nics_box',section_networks).append(option);
            return false;
        });
        $('#remove_nic_button',section_networks).click(function(){
            box_remove_element(section_networks,'#nics_box');
            return false;
        });
    };

    var graphics_setup = function(){
        $('fieldset',section_graphics).hide();
        $('.vm_param',section_graphics).hide();
        $('select#TYPE',section_graphics).parent().show();

        $('#add_graphics',section_graphics).click(function(){
            $('fieldset',section_graphics).toggle();
            return false;
        });

        //Chrome workaround
        $('select#TYPE',section_graphics).change(function(){
            $(this).trigger("click");
        });

        $('select#TYPE',section_graphics).click(function(){
            g_type = $(this).val();
            switch (g_type) {
                case "vrdp":
                    $('#LISTEN',section_graphics).parent().show();
                    $('#PORT',section_graphics).parent().show();
                    break;
                default:
                    $('#LISTEN',section_graphics).parent().hide();
                    $('#PORT',section_graphics).parent().hide();
                    break;
            }
        });
    }

    var context_setup = function(){
        $('fieldset',section_context).hide();

        $('#add_context',section_context).click(function(){
            $('fieldset',section_context).toggle();
            return false;
        });

        $('#add_context_button', section_context).click(function(){
            var name = $('#var_name',section_context).val();
            var value = $('#var_value',section_context).val();
            if (!name.length || !value.length) {
                notifyError("Context variable name and value must be filled in");
                return false;
            }
            option= '<option value=\''+value+'\' name=\''+name+'\'>'+
            name+'='+value+
            '</option>';
            $('select#context_box',section_context).append(option);
            return false;
        });

        $('#remove_context_button', section_context).click(function(){
           box_remove_element(section_context,'#context_box');
           return false;
        });
    };

    // Set up the placement section
    var placement_setup = function(){
        $('fieldset',section_placement).hide();

        $('#add_placement',section_placement).click(function(){
            $('fieldset',section_placement).toggle();
            return false;
        });
    };

    var raw_setup = function(){
        $('fieldset',section_raw).hide();

        $('#add_raw',section_raw).click(function(){
            $('fieldset',section_raw).toggle();
            return false;
        });
    };

    $('div#dialogs').append('<div title="Create VM Template" id="vbox_create_template_dialog"></div>');



    $('#vbox_create_template_dialog').html(vbox_create_vm_tmpl);
    $('#vbox_template_create_tabs').tabs();

    var height = Math.floor($(window).height()*0.8); //set height to a percentage of the window
    $('#vbox_create_template_dialog').dialog({
        autoOpen: false,
        modal: true,
        width: 700,
        height: height
    });

    $('#vbox_create_template_dialog button').button();
    setupTips($('#vbox_create_template_dialog'));

    iconToggle();
    var dialog = $('#vbox_create_template_dialog');
    var section_capacity = $('#capacity',dialog);
    var section_disks = $('#disks',dialog);
    var section_networks = $('#networks',dialog);
    var section_graphics = $('#graphics',dialog);
    var section_context = $('#context',dialog);
    var section_placement = $('#placement',dialog);
    var section_raw = $('#raw',dialog);

    foldUnfoldToggle();
    $('.vbox .man_icon',dialog).css("display","inline-block");

    capacity_setup();
    disks_setup();
    networks_setup();
    graphics_setup();
    context_setup();
    placement_setup();
    raw_setup();

    //Process form
    $('#vbox_create_template_dialog button#create_template_form_easy').click(function(){
    //validate form

        var vm_json = {};

        //process capacity options
                var scope = section_capacity;

        if (!mandatory_filter(scope)){
            notifyError("There are mandatory fields missing in the capacity section");
            return false;
        };
                addSectionJSON(vm_json,scope);

        //process disks -> fetch from box
        scope = section_disks;
        vm_json["DISK"] = [];
        addBoxJSON(vm_json["DISK"],scope,'#disks_box');

        //process nics -> fetch from box
        scope = section_networks;
        vm_json["NIC"] = [];
        addBoxJSON(vm_json["NIC"],scope,'#nics_box');

        //process graphics -> fetch fields with value
        scope = section_graphics;
        var gr_type = $('select#TYPE',scope).val();
        if (gr_type.length){
            if (gr_type == "sdl") {
                vm_json["GRAPHICS"] = {
                    "TYPE" : "sdl"
                    }
            } else if (gr_type == "vrdp") {
                var listen = $('#LISTEN',scope).val();
                var port = $('#PORT',scope).val();
                if (!listen.length) {

                } else if (port.length) {
                    vm_json["GRAPHICS"] = {
                        "TYPE" : "vrdp",
                        "LISTEN" : listen,
                        "PORT" : port
                    }
                } else {
                    vm_json["GRAPHICS"] = {
                        "TYPE" : "vrdp",
                        "LISTEN" : listen,
                    }
                }
            }
        }

        //context
        scope = section_context;
        var context = $('#CONTEXT',scope).val();
        vm_json["CONTEXT"] = {};
        $('#context_box option',scope).each(function(){
            name = $(this).attr("name");
            value = $(this).val();
            vm_json["CONTEXT"][name]=value;
        });

        //placement -> fetch with value
        scope = section_placement;
        addSectionJSON(vm_json,scope);

        //raw -> if value set type to driver and fetch
        scope = section_raw;
        vm_json["RAW"] = {};
        addSectionJSON(vm_json["RAW"],scope);

        // remove empty elements
        vm_json = removeEmptyObjects(vm_json);

        //wrap it in the "vmtemplate" object
        vm_json = {"vmtemplate": vm_json};

        Sunstone.runAction("Template.create",vm_json);

        $('#vbox_create_template_dialog').dialog('close');
        return false;
    });

    $('#vbox_create_template_dialog button#create_template_form_manual').click(function(){
        var template = $('#textarea_vm_template').val();

        //wrap it in the "vm" object
        template = {"vmtemplate": {"template_raw": template}};

        Sunstone.runAction("Template.create",template);
        $('#create_template_dialog').dialog('close');
        return false;
    });

    //Reset form - empty boxes
    $('button#reset_vm_form').click(function(){
        $('select#disks_box option',section_disks).remove();
        $('select#nics_box option',section_networks).remove();
        $('select#inputs_box option',section_inputs).remove();
        return true;
    });
}

$(document).ready(function(){
    setupCreateVBoxVMDialog();
    setupCreateVBoxHostDialog();
    notifyMessage("VirtualBox plugin loaded correctly");
})
